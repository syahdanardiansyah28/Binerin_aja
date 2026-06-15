const gateInputCount = {
  AND: 2,
  OR: 2,
  XOR: 2,
  NAND: 2,
  NOR: 2,
  XNOR: 2,
  NOT: 1,
};

const calculateGate = (gate, values) => {
  const a = values.a;
  const b = values.b;

  if (gate === 'AND') return a & b;
  if (gate === 'OR') return a | b;
  if (gate === 'XOR') return a ^ b;
  if (gate === 'NAND') return Number(!(a & b));
  if (gate === 'NOR') return Number(!(a | b));
  if (gate === 'XNOR') return Number(!(a ^ b));
  if (gate === 'NOT') return Number(!a);
  return null;
};

const sourceKey = (edge) => edge.sourceHandle || 'out';

const targetKey = (edge) => edge.targetHandle || 'in';

const outputValue = (outputs, handle) => {
  if (!outputs) return undefined;
  if (outputs[handle] !== undefined) return outputs[handle];
  return outputs.out;
};

const incomingValuesFor = (node, edges, outputMap) => {
  const incoming = edges.filter((edge) => edge.target === node.id);
  const values = {};

  incoming.forEach((edge) => {
    const sourceOutputs = outputMap.get(edge.source);
    const value = outputValue(sourceOutputs, sourceKey(edge));
    if (value !== undefined && value !== null) {
      values[targetKey(edge)] = value;
    }
  });

  return values;
};

const missingInputs = (required, values) => required.filter((key) => values[key] === undefined);

export function simulateCircuit(nodes, edges) {
  const outputMap = new Map();
  const details = new Map();
  const errors = [];

  nodes.forEach((node) => {
    if (node.type === 'inputNode') {
      const value = Number(node.data.value || 0);
      outputMap.set(node.id, { out: value });
      details.set(node.id, {
        value,
        outputs: { out: value },
        inputValues: {},
        status: 'Ready',
        errorMessage: '',
      });
    }
  });

  // Iterasi beberapa kali agar node yang posisinya tidak topologis tetap bisa terhitung.
  for (let pass = 0; pass < nodes.length + 2; pass += 1) {
    nodes.forEach((node) => {
      if (node.type === 'inputNode') return;

      const values = incomingValuesFor(node, edges, outputMap);

      if (node.type === 'gateNode') {
        const gate = node.data.gateType;
        const required = gateInputCount[gate] === 1 ? ['a'] : ['a', 'b'];
        const missing = missingInputs(required, values);
        if (missing.length) {
          details.set(node.id, {
            value: null,
            outputs: {},
            inputValues: values,
            status: 'Waiting Input',
            errorMessage: `Menunggu input ${missing.join(', ').toUpperCase()}.`,
          });
          return;
        }

        const value = calculateGate(gate, values);
        outputMap.set(node.id, { out: value });
        details.set(node.id, {
          value,
          outputs: { out: value },
          inputValues: values,
          status: 'Ready',
          errorMessage: '',
        });
      }

      if (node.type === 'halfAdderNode') {
        const missing = missingInputs(['a', 'b'], values);
        if (missing.length) {
          details.set(node.id, {
            value: null,
            outputs: {},
            inputValues: values,
            status: 'Waiting Input',
            errorMessage: `Menunggu input ${missing.join(', ').toUpperCase()}.`,
          });
          return;
        }

        const outputs = {
          sum: values.a ^ values.b,
          carry: values.a & values.b,
        };
        outputMap.set(node.id, outputs);
        details.set(node.id, {
          value: outputs.sum,
          outputs,
          inputValues: values,
          status: 'Ready',
          errorMessage: '',
        });
      }

      if (node.type === 'fullAdderNode') {
        const missing = missingInputs(['a', 'b', 'cin'], values);
        if (missing.length) {
          details.set(node.id, {
            value: null,
            outputs: {},
            inputValues: values,
            status: 'Waiting Input',
            errorMessage: `Menunggu input ${missing.join(', ').toUpperCase()}.`,
          });
          return;
        }

        const sum = values.a ^ values.b ^ values.cin;
        const carry = (values.a & values.b) | (values.b & values.cin) | (values.a & values.cin);
        const outputs = { sum, carry };
        outputMap.set(node.id, outputs);
        details.set(node.id, {
          value: sum,
          outputs,
          inputValues: values,
          status: 'Ready',
          errorMessage: '',
        });
      }

      if (node.type === 'outputNode') {
        const missing = missingInputs(['in'], values);
        if (missing.length) {
          details.set(node.id, {
            value: null,
            outputs: {},
            inputValues: values,
            status: 'Waiting Input',
            errorMessage: 'Menunggu sinyal masuk.',
          });
          return;
        }

        details.set(node.id, {
          value: values.in,
          outputs: { in: values.in },
          inputValues: values,
          status: 'Ready',
          errorMessage: '',
        });
      }
    });
  }

  nodes.forEach((node) => {
    if (!details.has(node.id)) {
      details.set(node.id, {
        value: null,
        outputs: {},
        inputValues: {},
        status: 'Waiting Input',
        errorMessage: 'Node belum mendapat input lengkap.',
      });
    }
  });

  details.forEach((detail, nodeId) => {
    if (detail.status === 'Waiting Input') {
      const node = nodes.find((item) => item.id === nodeId);
      errors.push(`${node?.data?.label || nodeId}: ${detail.errorMessage}`);
    }
  });

  return {
    status: errors.length ? 'Waiting Input' : 'Success',
    errorMessage: errors.length ? errors[0] : '',
    nodeDetails: details,
  };
}

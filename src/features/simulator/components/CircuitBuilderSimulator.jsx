import { useCallback, useMemo, useRef, useState } from 'react';
import {
  addEdge,
  Background,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Button from '../../../components/common/Button';
import Card from '../../../components/common/Card';
import InputNode from '../../../components/circuit/InputNode';
import OutputNode from '../../../components/circuit/OutputNode';
import GateNode from '../../../components/circuit/GateNode';
import HalfAdderNode from '../../../components/circuit/HalfAdderNode';
import FullAdderNode from '../../../components/circuit/FullAdderNode';
import { circuitPalette, MAX_CIRCUIT_EDGES, MAX_CIRCUIT_NODES } from '../data/circuitPalette';
import { gateDescriptions } from '../data/gateDescriptions';
import { simulateCircuit } from '../logic/circuitSimulator';

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  gateNode: GateNode,
  halfAdderNode: HalfAdderNode,
  fullAdderNode: FullAdderNode,
};

const defaultEdgeOptions = {
  animated: false,
  style: { stroke: 'rgb(var(--color-accent))', strokeWidth: 2 },
};

const makeBaseData = (item, onToggle) => ({
  label: item.label,
  gateType: item.gateType,
  value: item.kind === 'inputNode' ? 0 : null,
  outputs: {},
  status: item.kind === 'inputNode' ? 'Ready' : 'Waiting Input',
  errorMessage: '',
  onToggle,
});

export default function CircuitBuilderSimulator() {
  const nodeCounter = useRef(4);
  const [selectedComponentKey, setSelectedComponentKey] = useState(`${circuitPalette[0].kind}-${circuitPalette[0].label}`);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState([]);
  const [simulationStatus, setSimulationStatus] = useState('Ready');
  const [simulationMessage, setSimulationMessage] = useState('Rangkaian demo siap dijalankan.');

  const toggleInput = useCallback((nodeId) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId && node.type === 'inputNode'
          ? {
              ...node,
              data: {
                ...node.data,
                value: node.data.value === 1 ? 0 : 1,
                outputs: { out: node.data.value === 1 ? 0 : 1 },
                status: 'Ready',
              },
            }
          : node,
      ),
    );
  }, []);

  const initialNodes = useMemo(
    () => [
      {
        id: 'input-1',
        type: 'inputNode',
        position: { x: 40, y: 110 },
        data: { label: 'Input A', value: 1, outputs: { out: 1 }, status: 'Ready', onToggle: toggleInput },
      },
      {
        id: 'gate-2',
        type: 'gateNode',
        position: { x: 280, y: 100 },
        data: { label: 'AND', gateType: 'AND', value: null, outputs: {}, status: 'Waiting Input', onToggle: toggleInput },
      },
      {
        id: 'output-3',
        type: 'outputNode',
        position: { x: 540, y: 108 },
        data: { label: 'Output LED', value: null, outputs: {}, status: 'Waiting Input', onToggle: toggleInput },
      },
    ],
    [toggleInput],
  );

  const initialEdges = useMemo(
    () => [
      { id: 'edge-input-gate', source: 'input-1', sourceHandle: 'out', target: 'gate-2', targetHandle: 'a', ...defaultEdgeOptions },
      { id: 'edge-gate-output', source: 'gate-2', sourceHandle: 'out', target: 'output-3', targetHandle: 'in', ...defaultEdgeOptions },
    ],
    [],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const selectedNode = useMemo(() => nodes.find((node) => node.id === selectedNodeId), [nodes, selectedNodeId]);
  const selectedEdge = useMemo(() => edges.find((edge) => edge.id === selectedEdgeId), [edges, selectedEdgeId]);
  const selectedComponent = useMemo(
    () => circuitPalette.find((item) => `${item.kind}-${item.label}` === selectedComponentKey) || circuitPalette[0],
    [selectedComponentKey],
  );

  const onConnect = useCallback(
    (connection) => {
      setEdges((currentEdges) => {
        if (currentEdges.length >= MAX_CIRCUIT_EDGES) {
          setSimulationStatus('Limit');
          setSimulationMessage(`Maksimal ${MAX_CIRCUIT_EDGES} kabel dalam satu canvas.`);
          return currentEdges;
        }

        return addEdge({ ...connection, ...defaultEdgeOptions }, currentEdges);
      });
    },
    [setEdges],
  );

  const addComponent = useCallback(
    (item) => {
      if (nodes.length >= MAX_CIRCUIT_NODES) {
        setSimulationStatus('Limit');
        setSimulationMessage(`Maksimal ${MAX_CIRCUIT_NODES} node dalam satu canvas.`);
        return;
      }

      const id = `${item.kind}-${nodeCounter.current}`;
      const offset = nodeCounter.current * 18;
      nodeCounter.current += 1;

      setNodes((currentNodes) => [
        ...currentNodes,
        {
          id,
          type: item.kind,
          position: { x: 120 + (offset % 360), y: 90 + (offset % 220) },
          data: makeBaseData(item, toggleInput),
        },
      ]);
      setSelectedNodeId(id);
      setSimulationStatus('Ready');
      setSimulationMessage(`${item.label} ditambahkan.`);
    },
    [nodes.length, setNodes, toggleInput],
  );

  const runSimulation = useCallback(() => {
    const simulation = simulateCircuit(nodes, edges);

    setNodes((currentNodes) =>
      currentNodes.map((node) => {
        const detail = simulation.nodeDetails.get(node.id);
        if (!detail) return node;

        return {
          ...node,
          data: {
            ...node.data,
            value: detail.value,
            outputs: detail.outputs,
            inputValues: detail.inputValues,
            status: detail.status,
            errorMessage: detail.errorMessage,
            onToggle: toggleInput,
          },
        };
      }),
    );

    setSimulationStatus(simulation.status);
    setSimulationMessage(simulation.errorMessage || 'Simulation complete.');
  }, [edges, nodes, setNodes, toggleInput]);

  const deleteSelected = useCallback(() => {
    const nodeIdsToDelete = new Set(selectedNodeIds);
    const edgeIdsToDelete = new Set(selectedEdgeIds);

    if (!nodeIdsToDelete.size && selectedNodeId) nodeIdsToDelete.add(selectedNodeId);
    if (!edgeIdsToDelete.size && selectedEdgeId) edgeIdsToDelete.add(selectedEdgeId);
    if (!nodeIdsToDelete.size && !edgeIdsToDelete.size) {
      setSimulationStatus('Ready');
      setSimulationMessage('Pilih node atau kabel terlebih dahulu.');
      return;
    }

    setNodes((currentNodes) => currentNodes.filter((node) => !nodeIdsToDelete.has(node.id)));
    setEdges((currentEdges) =>
      currentEdges.filter(
        (edge) =>
          !edgeIdsToDelete.has(edge.id) &&
          !nodeIdsToDelete.has(edge.source) &&
          !nodeIdsToDelete.has(edge.target),
      ),
    );
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setSelectedNodeIds([]);
    setSelectedEdgeIds([]);
    setSimulationStatus('Ready');
    setSimulationMessage('Item terpilih dihapus.');
  }, [selectedEdgeId, selectedEdgeIds, selectedNodeId, selectedNodeIds, setEdges, setNodes]);

  const resetCanvas = useCallback(() => {
    nodeCounter.current = 4;
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setSelectedNodeIds([]);
    setSelectedEdgeIds([]);
    setSimulationStatus('Ready');
    setSimulationMessage('Canvas kembali ke rangkaian demo.');
  }, [initialEdges, initialNodes, setEdges, setNodes]);

  const clearConnections = useCallback(() => {
    setEdges([]);
    setSelectedEdgeId(null);
    setSelectedEdgeIds([]);
    setSimulationStatus('Ready');
    setSimulationMessage('Semua kabel koneksi dihapus.');
  }, [setEdges]);

  const handleSelectionChange = useCallback(({ nodes: selectedNodes, edges: selectedEdges }) => {
    setSelectedNodeIds(selectedNodes.map((node) => node.id));
    setSelectedEdgeIds(selectedEdges.map((edge) => edge.id));
    setSelectedNodeId(selectedNodes[0]?.id || null);
    setSelectedEdgeId(selectedEdges[0]?.id || null);
  }, []);

  const selectedOutputs = selectedNode?.data?.outputs || {};
  const selectedInputs = selectedNode?.data?.inputValues || {};
  const statusTone = simulationStatus === 'Success' ? 'border-linear-success/30 bg-linear-successSurface text-linear-successText' : 'border-linear-border/70 bg-linear-surface2 text-linear-muted';

  return (
    <div className="grid gap-5">
      <Card className="min-w-0 overflow-hidden p-3 md:p-4">
        <div className="mb-3 grid gap-3 xl:grid-cols-[1fr_auto] xl:items-center">
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-medium text-linear-strong">Circuit Canvas</h3>
            <span className="rounded-full border border-linear-border/70 bg-linear-surface2 px-3 py-1 font-mono text-xs text-linear-muted">
              {nodes.length}/{MAX_CIRCUIT_NODES}
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-[minmax(180px,260px)_auto_auto_auto_auto_auto]">
            <label className="sr-only" htmlFor="circuit-component-select">Components</label>
            <select
              id="circuit-component-select"
              className="min-h-11 rounded-md border border-linear-border/70 bg-linear-surface2 px-3 text-sm font-medium text-linear-text outline-none transition focus:border-linear-accent"
              value={selectedComponentKey}
              onChange={(event) => setSelectedComponentKey(event.target.value)}
            >
              {circuitPalette.map((item) => {
                const key = `${item.kind}-${item.label}`;
                return (
                  <option key={key} value={key}>
                    {item.label}
                  </option>
                );
              })}
            </select>
            <Button className="rounded-md" variant="outline" onClick={() => addComponent(selectedComponent)}>Add</Button>
            <Button className="rounded-md" variant="primary" onClick={runSimulation}>Run</Button>
            <Button className="rounded-md" variant="outline" onClick={deleteSelected}>Delete</Button>
            <Button className="rounded-md" variant="outline" onClick={resetCanvas}>Reset</Button>
            <Button className="rounded-md" variant="danger" onClick={clearConnections}>Clear</Button>
          </div>
        </div>

        <div className="h-[560px] overflow-hidden rounded-lg border border-linear-border/70 bg-linear-bg md:h-[680px]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={(_, node) => {
              setSelectedNodeId(node.id);
              setSelectedEdgeId(null);
            }}
            onEdgeClick={(_, edge) => {
              setSelectedEdgeId(edge.id);
              setSelectedNodeId(null);
            }}
            onPaneClick={() => {
              setSelectedNodeId(null);
              setSelectedEdgeId(null);
            }}
            onSelectionChange={handleSelectionChange}
            deleteKeyCode={['Backspace', 'Delete']}
            fitView
            defaultEdgeOptions={defaultEdgeOptions}
            proOptions={{ hideAttribution: true }}
          >
            <Background color="rgb(var(--color-border))" gap={24} size={1} />
            <Controls className="circuit-controls" />
          </ReactFlow>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-3">
        <Card>
          <h3 className="text-lg font-medium text-linear-strong">Simulation Status</h3>
          <div className={`mt-4 rounded-md border p-3 text-sm leading-6 ${statusTone}`}>
            <p className="font-mono text-xs">{simulationStatus}</p>
            <p className="mt-2">{simulationMessage}</p>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-linear-strong">Properties</h3>
          {selectedNode ? (
            <div className="mt-4 grid gap-3 text-sm text-linear-muted">
              <Property label="Component" value={selectedNode.data.label || selectedNode.data.gateType} />
              {selectedNode.type === 'inputNode' && (
                <Button className="rounded-md" variant="outline" onClick={() => toggleInput(selectedNode.id)}>
                  Toggle Input: {selectedNode.data.value}
                </Button>
              )}
              {selectedNode.data.gateType && <Property label="Detail" value={gateDescriptions[selectedNode.data.gateType]} />}
              <Property label="Inputs" value={Object.keys(selectedInputs).length ? JSON.stringify(selectedInputs) : '-'} />
              <Property label="Outputs" value={Object.keys(selectedOutputs).length ? JSON.stringify(selectedOutputs) : selectedNode.data.value ?? '-'} />
              <Property label="Status" value={selectedNode.data.status || 'Waiting Input'} />
            </div>
          ) : selectedEdge ? (
            <div className="mt-4 grid gap-3 text-sm text-linear-muted">
              <Property label="Cable" value={selectedEdge.id} />
              <Property label="Route" value={`${selectedEdge.source}:${selectedEdge.sourceHandle || 'out'} -> ${selectedEdge.target}:${selectedEdge.targetHandle || 'in'}`} />
              <Button className="rounded-md" variant="danger" onClick={deleteSelected}>Delete Cable</Button>
            </div>
          ) : (
            <div className="mt-4 rounded-md border border-linear-border/70 bg-linear-surface2 p-3 font-mono text-sm text-linear-muted">-</div>
          )}
        </Card>

        <Card>
          <h3 className="text-lg font-medium text-linear-strong">Output LEDs</h3>
          <div className="mt-4 grid gap-3">
            {nodes.filter((node) => node.type === 'outputNode').map((node) => (
              <div key={node.id} className="flex items-center justify-between rounded-md border border-linear-border/70 bg-linear-surface2 p-3">
                <span className="font-mono text-sm text-linear-muted">{node.data.label}</span>
                <span className={`h-5 w-5 rounded-full border ${node.data.value === 1 ? 'border-linear-success bg-linear-success' : 'border-linear-border bg-linear-line'}`} />
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function Property({ label, value }) {
  return (
    <div className="rounded-md border border-linear-border/70 bg-linear-surface2 p-3">
      <p className="text-xs text-linear-subtle">{label}</p>
      <p className="mt-1 break-words font-mono text-linear-text">{value}</p>
    </div>
  );
}

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
import InputNode from '../circuit/InputNode';
import OutputNode from '../circuit/OutputNode';
import GateNode from '../circuit/GateNode';
import HalfAdderNode from '../circuit/HalfAdderNode';
import FullAdderNode from '../circuit/FullAdderNode';
import { simulateCircuit } from '../../utils/circuitSimulator';

const nodeTypes = {
  inputNode: InputNode,
  outputNode: OutputNode,
  gateNode: GateNode,
  halfAdderNode: HalfAdderNode,
  fullAdderNode: FullAdderNode,
};

const palette = [
  { label: 'Input', kind: 'inputNode' },
  { label: 'Output LED', kind: 'outputNode' },
  { label: 'AND', kind: 'gateNode', gateType: 'AND' },
  { label: 'OR', kind: 'gateNode', gateType: 'OR' },
  { label: 'NOT', kind: 'gateNode', gateType: 'NOT' },
  { label: 'NAND', kind: 'gateNode', gateType: 'NAND' },
  { label: 'NOR', kind: 'gateNode', gateType: 'NOR' },
  { label: 'XOR', kind: 'gateNode', gateType: 'XOR' },
  { label: 'XNOR', kind: 'gateNode', gateType: 'XNOR' },
  { label: 'Half Adder', kind: 'halfAdderNode' },
  { label: 'Full Adder', kind: 'fullAdderNode' },
];

const gateDescriptions = {
  AND: 'Output 1 jika semua input 1.',
  OR: 'Output 1 jika minimal satu input 1.',
  NOT: 'Membalik input A.',
  NAND: 'Kebalikan AND.',
  NOR: 'Kebalikan OR.',
  XOR: 'Output 1 jika input berbeda.',
  XNOR: 'Output 1 jika input sama.',
};

const defaultEdgeOptions = {
  animated: true,
  style: { stroke: '#22d3ee', strokeWidth: 2 },
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

export default function AdvancedCircuitBuilder() {
  const nodeCounter = useRef(4);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selectedEdgeId, setSelectedEdgeId] = useState(null);
  const [selectedNodeIds, setSelectedNodeIds] = useState([]);
  const [selectedEdgeIds, setSelectedEdgeIds] = useState([]);
  const [simulationStatus, setSimulationStatus] = useState('Ready');
  const [simulationMessage, setSimulationMessage] = useState('Tambahkan komponen, hubungkan kabel, lalu jalankan simulasi.');

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

  const onConnect = useCallback(
    (connection) => {
      setEdges((currentEdges) => addEdge({ ...connection, ...defaultEdgeOptions }, currentEdges));
    },
    [setEdges],
  );

  const addComponent = useCallback(
    (item) => {
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
    },
    [setNodes, toggleInput],
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
    setSimulationMessage(simulation.errorMessage || 'Simulation complete. Semua node yang lengkap sudah dihitung.');
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
    setSimulationMessage('Item terpilih sudah dihapus.');
  }, [selectedEdgeId, selectedEdgeIds, selectedNodeId, selectedNodeIds, setEdges, setNodes]);

  const resetCanvas = useCallback(() => {
    nodeCounter.current = 4;
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNodeId(null);
    setSimulationStatus('Ready');
    setSimulationMessage('Canvas direset ke rangkaian contoh.');
  }, [initialEdges, initialNodes, setEdges, setNodes]);

  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
    setSelectedEdgeId(null);
    setSelectedNodeIds([]);
    setSelectedEdgeIds([]);
    setSimulationStatus('Ready');
    setSimulationMessage('Canvas kosong. Tambahkan komponen dari panel kiri.');
  }, [setEdges, setNodes]);

  const clearConnections = useCallback(() => {
    setEdges([]);
    setSelectedEdgeId(null);
    setSelectedEdgeIds([]);
    setSimulationStatus('Ready');
    setSimulationMessage('Semua kabel koneksi sudah dihapus.');
  }, [setEdges]);

  const handleSelectionChange = useCallback(({ nodes: selectedNodes, edges: selectedEdges }) => {
    setSelectedNodeIds(selectedNodes.map((node) => node.id));
    setSelectedEdgeIds(selectedEdges.map((edge) => edge.id));
    setSelectedNodeId(selectedNodes[0]?.id || null);
    setSelectedEdgeId(selectedEdges[0]?.id || null);
  }, []);

  const handleNodesDelete = useCallback(
    (deletedNodes) => {
      const deletedIds = new Set(deletedNodes.map((node) => node.id));
      setEdges((currentEdges) =>
        currentEdges.filter((edge) => !deletedIds.has(edge.source) && !deletedIds.has(edge.target)),
      );
      setSelectedNodeId(null);
      setSelectedNodeIds([]);
    },
    [setEdges],
  );

  const handleEdgesDelete = useCallback(() => {
    setSelectedEdgeId(null);
    setSelectedEdgeIds([]);
  }, []);

  const selectedOutputs = selectedNode?.data?.outputs || {};
  const selectedInputs = selectedNode?.data?.inputValues || {};

  return (
    <div className="mx-auto grid w-full max-w-full min-w-0 gap-5 overflow-x-hidden xl:max-w-7xl">
      <section className="cpu-card rounded p-5 sm:p-6">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan-200/70 md:tracking-[0.28em]">
          Advanced Digital Circuit Simulator
        </p>
        <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">Logic Gate Circuit Editor</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
          Rancang rangkaian digital dengan node, port, kabel, input toggle, LED output, dan simulasi logika berbasis React Flow.
        </p>
      </section>

      <div className="grid min-w-0 gap-5 xl:grid-cols-[230px_minmax(0,1fr)_320px]">
        <aside className="cpu-card min-w-0 rounded p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-base font-semibold text-white">Components</h3>
            <span className="font-mono text-xs text-cyan-200/60">{palette.length}</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 xl:grid xl:overflow-visible xl:pb-0">
            {palette.map((item) => (
              <button
                key={`${item.kind}-${item.label}`}
                className="min-h-12 min-w-[128px] rounded border border-white/10 bg-white/[0.035] px-3 py-2 text-left text-sm text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10 hover:text-cyan-100 xl:min-w-0"
                type="button"
                onClick={() => addComponent(item)}
              >
                <span className="block font-mono font-bold">{item.label}</span>
                <span className="mt-1 block text-[11px] text-slate-400">Add node</span>
              </button>
            ))}
          </div>
        </aside>

        <section className="cpu-card min-w-0 overflow-hidden rounded p-3 md:p-4">
          <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-white">Circuit Canvas</h3>
              <p className="text-xs text-slate-400">Drag node, tarik kabel dari port kanan ke port kiri.</p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:flex">
              <button className="h-10 rounded border border-emerald-300/35 bg-emerald-300/15 px-3 font-mono text-xs font-bold text-emerald-100" type="button" onClick={runSimulation}>
                Run Simulation
              </button>
              <button className="h-10 rounded border border-cyan-300/30 bg-cyan-300/10 px-3 font-mono text-xs font-bold text-cyan-100" type="button" onClick={deleteSelected}>
                Delete Selected
              </button>
              <button className="h-10 rounded border border-cyan-300/30 bg-cyan-300/10 px-3 font-mono text-xs font-bold text-cyan-100" type="button" onClick={resetCanvas}>
                Reset Demo
              </button>
              <button className="h-10 rounded border border-pink-300/30 bg-pink-300/10 px-3 font-mono text-xs font-bold text-pink-100" type="button" onClick={clearConnections}>
                Clear Connections
              </button>
              <button className="h-10 rounded border border-pink-300/30 bg-pink-300/10 px-3 font-mono text-xs font-bold text-pink-100" type="button" onClick={clearCanvas}>
                Clear Canvas
              </button>
            </div>
          </div>

          <div className="h-[520px] min-w-0 overflow-hidden rounded border border-cyan-300/20 bg-slate-950/70 md:h-[640px]">
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
              onNodesDelete={handleNodesDelete}
              onEdgesDelete={handleEdgesDelete}
              deleteKeyCode={['Backspace', 'Delete']}
              fitView
              defaultEdgeOptions={defaultEdgeOptions}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#164e63" gap={22} size={1} />
              <Controls className="circuit-controls" />
            </ReactFlow>
          </div>
        </section>

        <aside className="grid min-w-0 content-start gap-5">
          <section className="cpu-card rounded p-4">
            <h3 className="text-base font-semibold text-white">Simulation Status</h3>
            <div className={`mt-3 rounded border p-3 text-sm ${simulationStatus === 'Success' ? 'border-emerald-300/30 bg-emerald-300/10 text-emerald-100' : simulationStatus === 'Waiting Input' ? 'border-yellow-300/30 bg-yellow-300/10 text-yellow-100' : 'border-cyan-300/20 bg-cyan-300/10 text-cyan-100'}`}>
              <p className="font-mono text-xs uppercase tracking-[0.18em]">{simulationStatus}</p>
              <p className="mt-2 leading-6">{simulationMessage}</p>
            </div>
          </section>

          <section className="cpu-card rounded p-4">
            <h3 className="text-base font-semibold text-white">Properties</h3>
            {selectedNode ? (
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <div className="rounded border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-xs text-slate-400">Component</p>
                  <p className="mt-1 font-mono text-cyan-100">{selectedNode.data.label || selectedNode.data.gateType}</p>
                </div>
                {selectedNode.type === 'inputNode' && (
                  <button
                    className="h-11 rounded border border-cyan-300/30 bg-cyan-300/10 font-mono text-sm font-bold text-cyan-100"
                    type="button"
                    onClick={() => toggleInput(selectedNode.id)}
                  >
                    Toggle Input: {selectedNode.data.value}
                  </button>
                )}
                {selectedNode.data.gateType && (
                  <div className="rounded border border-white/10 bg-white/[0.035] p-3">
                    <p className="text-xs text-slate-400">Detail</p>
                    <p className="mt-1 leading-6">{gateDescriptions[selectedNode.data.gateType]}</p>
                  </div>
                )}
                <div className="rounded border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-xs text-slate-400">Inputs</p>
                  <p className="mt-1 font-mono text-cyan-100">{Object.keys(selectedInputs).length ? JSON.stringify(selectedInputs) : '-'}</p>
                </div>
                <div className="rounded border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-xs text-slate-400">Outputs</p>
                  <p className="mt-1 font-mono text-cyan-100">{Object.keys(selectedOutputs).length ? JSON.stringify(selectedOutputs) : selectedNode.data.value ?? '-'}</p>
                </div>
                <div className="rounded border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-xs text-slate-400">Status</p>
                  <p className="mt-1 text-cyan-100">{selectedNode.data.status || 'Waiting Input'}</p>
                </div>
              </div>
            ) : selectedEdge ? (
              <div className="mt-4 grid gap-3 text-sm text-slate-300">
                <div className="rounded border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-xs text-slate-400">Selected Cable</p>
                  <p className="mt-1 break-all font-mono text-cyan-100">{selectedEdge.id}</p>
                </div>
                <div className="rounded border border-white/10 bg-white/[0.035] p-3">
                  <p className="text-xs text-slate-400">Route</p>
                  <p className="mt-1 font-mono text-cyan-100">
                    {selectedEdge.source}:{selectedEdge.sourceHandle || 'out'} -&gt; {selectedEdge.target}:{selectedEdge.targetHandle || 'in'}
                  </p>
                </div>
                <button
                  className="h-11 rounded border border-pink-300/30 bg-pink-300/10 font-mono text-sm font-bold text-pink-100"
                  type="button"
                  onClick={deleteSelected}
                >
                  Delete Cable
                </button>
              </div>
            ) : (
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Pilih node di canvas untuk melihat properti, input, output, dan status komponen.
              </p>
            )}
          </section>

          <section className="cpu-card rounded p-4">
            <h3 className="text-base font-semibold text-white">Output LEDs</h3>
            <div className="mt-4 grid gap-3">
              {nodes.filter((node) => node.type === 'outputNode').map((node) => (
                <div key={node.id} className="flex items-center justify-between rounded border border-white/10 bg-white/[0.035] p-3">
                  <span className="font-mono text-sm text-slate-300">{node.data.label}</span>
                  <span className={`h-6 w-6 rounded-full border ${node.data.value === 1 ? 'border-emerald-200 bg-emerald-300 shadow-[0_0_18px_rgba(52,211,153,0.7)]' : 'border-slate-500 bg-slate-800'}`} />
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

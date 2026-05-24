"use client";

import { useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const nodeTypes = {}; // Can be used for custom nodes in the future

const diagramData = {
  "mathem-solvex": {
    initialNodes: [
      { id: '1', position: { x: 250, y: 0 }, data: { label: 'Client (Next.js)' }, style: { background: '#f97316', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
      { id: '2', position: { x: 250, y: 100 }, data: { label: 'API Gateway (Node/Express)' }, style: { background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
      { id: '3', position: { x: 100, y: 200 }, data: { label: 'Sentence Transformers (Python)' }, style: { background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
      { id: '4', position: { x: 400, y: 200 }, data: { label: 'MongoDB (Primary DB)' }, style: { background: '#10b981', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
      { id: '5', position: { x: 100, y: 300 }, data: { label: 'Pinecone (Vector DB)' }, style: { background: '#ec4899', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
      { id: '6', position: { x: 400, y: 300 }, data: { label: 'Gemini API (Fallback)' }, style: { background: '#f43f5e', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px' } },
    ],
    initialEdges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Vectorize Query', markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e2-4', source: '2', target: '4', animated: false, label: 'Store Logs', markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e3-5', source: '3', target: '5', animated: true, label: 'Semantic Search', markerEnd: { type: MarkerType.ArrowClosed } },
      { id: 'e5-2', source: '5', target: '2', animated: true, label: 'Results' },
      { id: 'e2-6', source: '2', target: '6', animated: true, label: 'Low Confidence Fallback', markerEnd: { type: MarkerType.ArrowClosed }, style: { stroke: '#f43f5e' } },
    ]
  },
  "observeflow": {
    initialNodes: [
      { id: '1', position: { x: 250, y: 0 }, data: { label: 'Microservices Fleet' }, style: { background: '#64748b', color: '#fff', borderRadius: '8px' } },
      { id: '2', position: { x: 250, y: 100 }, data: { label: 'Go Ingestor (gRPC)' }, style: { background: '#3b82f6', color: '#fff', borderRadius: '8px' } },
      { id: '3', position: { x: 100, y: 200 }, data: { label: 'Redis Buffer' }, style: { background: '#ef4444', color: '#fff', borderRadius: '8px' } },
      { id: '4', position: { x: 400, y: 200 }, data: { label: 'MongoDB (Time-Series)' }, style: { background: '#10b981', color: '#fff', borderRadius: '8px' } },
      { id: '5', position: { x: 250, y: 300 }, data: { label: 'Grafana Dashboard' }, style: { background: '#f97316', color: '#fff', borderRadius: '8px' } },
    ],
    initialEdges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, label: 'Stream Logs' },
      { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Cache/Queue' },
      { id: 'e3-4', source: '3', target: '4', animated: true, label: 'Batch Flush' },
      { id: 'e4-5', source: '4', target: '5', animated: true, label: 'Visualize' },
    ]
  },
  "palora": {
    initialNodes: [
      { id: '1', position: { x: 250, y: 0 }, data: { label: 'React Client' }, style: { background: '#3b82f6', color: '#fff', borderRadius: '8px' } },
      { id: '2', position: { x: 250, y: 100 }, data: { label: 'Express Auth Server' }, style: { background: '#8b5cf6', color: '#fff', borderRadius: '8px' } },
      { id: '3', position: { x: 250, y: 200 }, data: { label: 'Gemini Sentiment Pipeline' }, style: { background: '#f43f5e', color: '#fff', borderRadius: '8px' } },
      { id: '4', position: { x: 100, y: 300 }, data: { label: 'MongoDB (Encrypted)' }, style: { background: '#10b981', color: '#fff', borderRadius: '8px' } },
    ],
    initialEdges: [
      { id: 'e1-2', source: '1', target: '2', animated: true, label: 'JWT Auth' },
      { id: 'e2-3', source: '2', target: '3', animated: true, label: 'Analyze Journal' },
      { id: 'e3-4', source: '3', target: '4', animated: false, label: 'AES-256 Store' },
    ]
  }
};

export default function SystemDiagram({ projectId }) {
  const data = diagramData[projectId] || { initialNodes: [], initialEdges: [] };
  const [nodes, setNodes, onNodesChange] = useNodesState(data.initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data.initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="w-full h-80 bg-[#0a0a0a] rounded-2xl border border-neutral-800 overflow-hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode="dark"
        attributionPosition="bottom-right"
      >
        <Controls />
        <MiniMap zoomable pannable nodeColor={(n) => n.style?.background || '#eee'} />
        <Background variant="dots" gap={12} size={1} color="#333" />
      </ReactFlow>
    </div>
  );
}


import { useState, useCallback, useEffect } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Panel,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CreditProcess, ProcessNode } from '../../types/creditProcess';
import { useToast } from '../../hooks/use-toast';
import ProcessNodeComponent from './ProcessNodeComponent';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { formatCurrency } from '../../utils/formatters';

// Tipos de nós personalizados
const nodeTypes = {
  step: ProcessNodeComponent,
  decision: ProcessNodeComponent,
  document: ProcessNodeComponent,
  end: ProcessNodeComponent,
};

interface ProcessFlowEditorProps {
  process: CreditProcess;
  onProcessUpdate?: (updatedProcess: CreditProcess) => void;
  readOnly?: boolean;
}

const ProcessFlowEditor = ({ process, onProcessUpdate, readOnly = false }: ProcessFlowEditorProps) => {
  const { toast } = useToast();
  const [nodes, setNodes, onNodesChange] = useNodesState(process.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(process.edges);
  const [totalTime, setTotalTime] = useState(process.totalTime);
  const [totalValue, setTotalValue] = useState(process.value);

  // Função para conectar nós
  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge({ ...params, animated: false }, eds));
      toast({
        title: 'Conexão criada',
        description: 'As etapas do processo foram conectadas.',
      });
    },
    [setEdges, toast]
  );

  // Função para atualizar o nó
  const onNodeUpdate = useCallback(
    (nodeId: string, data: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...data,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Calcular tempo total e valor quando os nós mudam
  useEffect(() => {
    let newTotalTime = 0;
    let valueAdjustment = 0;

    // Soma o tempo de todos os nós
    nodes.forEach((node) => {
      if (node.data.time) {
        newTotalTime += node.data.time;
      }
      if (node.data.value) {
        valueAdjustment += node.data.value;
      }
    });

    setTotalTime(newTotalTime);
    setTotalValue(process.value + valueAdjustment);

    // Atualize o processo pai se o callback existir
    if (onProcessUpdate) {
      onProcessUpdate({
        ...process,
        nodes: nodes as ProcessNode[],
        edges: edges,
        totalTime: newTotalTime,
        value: process.value + valueAdjustment,
      });
    }
  }, [nodes, edges, process, onProcessUpdate]);

  // Salvar alterações
  const handleSave = () => {
    if (onProcessUpdate) {
      onProcessUpdate({
        ...process,
        nodes: nodes as ProcessNode[],
        edges: edges,
        totalTime,
        value: totalValue,
      });
    }
    
    toast({
      title: "Processo salvo",
      description: "As alterações no fluxo foram salvas com sucesso.",
    });
  };

  return (
    <div className="h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={!readOnly}
        nodesConnectable={!readOnly}
        elementsSelectable={!readOnly}
      >
        <Background color="#aaa" gap={16} />
        <Controls />
        <MiniMap 
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
        <Panel position="top-right" className="bg-white p-4 rounded-md shadow-md">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Tempo total:</span>
              <span>{Math.floor(totalTime / 60)}h {totalTime % 60}min</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Valor:</span>
              <span>{formatCurrency(totalValue)}</span>
            </div>
            {!readOnly && (
              <Button onClick={handleSave} className="w-full">
                Salvar alterações
              </Button>
            )}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};

export default ProcessFlowEditor;

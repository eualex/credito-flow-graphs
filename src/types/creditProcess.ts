
export interface ProcessNode {
  id: string;
  type: string;
  position: {
    x: number;
    y: number;
  };
  data: {
    label: string;
    time?: number; // tempo em minutos
    value?: number; // valor em R$
    isCompleted?: boolean;
    description?: string;
  };
}

export interface ProcessEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  type?: string;
  animated?: boolean;
}

export interface CreditProcess {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'approved' | 'rejected';
  client: {
    name: string;
    id: string;
    cpf?: string;
    cnpj?: string;
  };
  value: number;
  requestDate: Date;
  expectedCompletionDate: Date;
  completedDate?: Date;
  currentStep?: string;
  totalTime: number; // tempo estimado total em minutos
  nodes: ProcessNode[];
  edges: ProcessEdge[];
}

export interface Attachment {
  id: string;
  name: string;
  type: string;
  size: number;
  uploadDate: Date;
  processId: string;
  url: string;
}

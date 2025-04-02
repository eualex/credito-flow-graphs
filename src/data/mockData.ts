
import { CreditProcess, Attachment } from "../types/creditProcess";

// Dados de processo de exemplo
export const mockProcess: CreditProcess = {
  id: "proc-001",
  title: "Financiamento Imobiliário - João Silva",
  status: "in_progress",
  client: {
    name: "João Silva",
    id: "client-001",
    cpf: "123.456.789-00"
  },
  value: 250000,
  requestDate: new Date(2023, 9, 15),
  expectedCompletionDate: new Date(2023, 10, 30),
  currentStep: "node-3",
  totalTime: 480, // 8 horas
  nodes: [
    {
      id: "node-1",
      type: "step",
      position: { x: 250, y: 5 },
      data: {
        label: "Recebimento de documentos",
        time: 60,
        isCompleted: true,
        description: "Análise inicial da documentação fornecida pelo cliente"
      }
    },
    {
      id: "node-2",
      type: "step",
      position: { x: 250, y: 100 },
      data: {
        label: "Verificação de crédito",
        time: 120,
        isCompleted: true,
        description: "Consulta aos órgãos de proteção ao crédito e análise de risco"
      }
    },
    {
      id: "node-3",
      type: "decision",
      position: { x: 250, y: 200 },
      data: {
        label: "Score suficiente?",
        time: 30,
        isCompleted: false,
        description: "Análise do score de crédito do cliente"
      }
    },
    {
      id: "node-4",
      type: "step",
      position: { x: 100, y: 300 },
      data: {
        label: "Análise avançada",
        time: 120,
        isCompleted: false,
        description: "Comitê de crédito analisa o caso em detalhe"
      }
    },
    {
      id: "node-5",
      type: "step",
      position: { x: 400, y: 300 },
      data: {
        label: "Contrato preliminar",
        time: 90,
        isCompleted: false,
        description: "Preparação do contrato preliminar"
      }
    },
    {
      id: "node-6",
      type: "end",
      position: { x: 250, y: 400 },
      data: {
        label: "Aprovação final",
        time: 60,
        isCompleted: false,
        description: "Assinatura do contrato e liberação do crédito"
      }
    }
  ],
  edges: [
    { id: "edge-1-2", source: "node-1", target: "node-2", animated: true },
    { id: "edge-2-3", source: "node-2", target: "node-3" },
    { id: "edge-3-4", source: "node-3", target: "node-4", label: "Não" },
    { id: "edge-3-5", source: "node-3", target: "node-5", label: "Sim" },
    { id: "edge-4-6", source: "node-4", target: "node-6" },
    { id: "edge-5-6", source: "node-5", target: "node-6" }
  ]
};

// Dados de anexos de exemplo
export const mockAttachments: Attachment[] = [
  {
    id: "att-001",
    name: "Documento de Identidade.pdf",
    type: "application/pdf",
    size: 1200000,
    uploadDate: new Date(2023, 9, 15),
    processId: "proc-001",
    url: "https://example.com/docs/id.pdf"
  },
  {
    id: "att-002",
    name: "Comprovante de Residência.pdf",
    type: "application/pdf",
    size: 800000,
    uploadDate: new Date(2023, 9, 15),
    processId: "proc-001",
    url: "https://example.com/docs/address.pdf"
  },
  {
    id: "att-003",
    name: "Contracheque.pdf",
    type: "application/pdf",
    size: 950000,
    uploadDate: new Date(2023, 9, 16),
    processId: "proc-001",
    url: "https://example.com/docs/income.pdf"
  },
  {
    id: "att-004",
    name: "Certidão de Casamento.jpg",
    type: "image/jpeg",
    size: 2500000,
    uploadDate: new Date(2023, 9, 17),
    processId: "proc-001",
    url: "https://example.com/docs/marriage.jpg"
  }
];

// Lista de processos
export const mockProcessList: CreditProcess[] = [
  mockProcess,
  {
    id: "proc-002",
    title: "Financiamento de Veículo - Maria Santos",
    status: "pending",
    client: {
      name: "Maria Santos",
      id: "client-002",
      cpf: "987.654.321-00"
    },
    value: 80000,
    requestDate: new Date(2023, 9, 18),
    expectedCompletionDate: new Date(2023, 10, 10),
    totalTime: 300,
    nodes: [],
    edges: []
  },
  {
    id: "proc-003",
    title: "Capital de Giro - Tech Solutions LTDA",
    status: "approved",
    client: {
      name: "Tech Solutions LTDA",
      id: "client-003",
      cnpj: "12.345.678/0001-90"
    },
    value: 500000,
    requestDate: new Date(2023, 9, 5),
    expectedCompletionDate: new Date(2023, 9, 25),
    completedDate: new Date(2023, 9, 20),
    totalTime: 360,
    nodes: [],
    edges: []
  },
  {
    id: "proc-004",
    title: "Empréstimo Pessoal - Carlos Oliveira",
    status: "rejected",
    client: {
      name: "Carlos Oliveira",
      id: "client-004",
      cpf: "456.789.123-00"
    },
    value: 30000,
    requestDate: new Date(2023, 9, 10),
    expectedCompletionDate: new Date(2023, 9, 20),
    completedDate: new Date(2023, 9, 18),
    totalTime: 240,
    nodes: [],
    edges: []
  }
];

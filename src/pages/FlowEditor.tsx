
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { mockProcess } from "../data/mockData";
import { CreditProcess } from "../types/creditProcess";
import ProcessFlowEditor from "../components/FlowEditor/ProcessFlowEditor";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { formatCurrency, formatDate, formatStatus, getStatusColor } from "../utils/formatters";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { useToast } from "../hooks/use-toast";
import { CalendarClock, User } from "lucide-react";

const FlowEditor = () => {
  const [process, setProcess] = useState<CreditProcess>(mockProcess);
  const location = useLocation();
  const { toast } = useToast();
  
  useEffect(() => {
    // Em um sistema real, aqui buscaríamos o processo pelo ID da URL
    const params = new URLSearchParams(location.search);
    const processId = params.get("id");
    
    if (processId) {
      // Simulando carregamento de processo pelo ID
      toast({
        title: "Processo carregado",
        description: `Carregando processo ${processId}`,
      });
    }
  }, [location, toast]);
  
  const handleProcessUpdate = (updatedProcess: CreditProcess) => {
    setProcess(updatedProcess);
  };

  return (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">{process.title}</h1>
        <div className="flex items-center mt-2 space-x-4">
          <Badge className={getStatusColor(process.status)}>
            {formatStatus(process.status)}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="h-4 w-4 mr-1" />
            <span>{process.client.name}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <CalendarClock className="h-4 w-4 mr-1" />
            <span>Solicitado em {formatDate(process.requestDate)}</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[calc(100vh-12rem)]">
            <CardHeader>
              <CardTitle>Editor de Fluxo</CardTitle>
              <CardDescription>
                Edite o fluxo do processo de análise de crédito. Alterar etapas afetará o tempo total e valores.
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              <ProcessFlowEditor 
                process={process}
                onProcessUpdate={handleProcessUpdate}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Detalhes do Processo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Valor Solicitado</h3>
                <p className="text-2xl font-bold">{formatCurrency(process.value)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Tempo Estimado</h3>
                <p>{Math.floor(process.totalTime / 60)}h {process.totalTime % 60}min</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Data Prevista de Conclusão</h3>
                <p>{formatDate(process.expectedCompletionDate)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Cliente</h3>
                <p>{process.client.name}</p>
                <p className="text-xs text-muted-foreground">
                  {process.client.cpf || process.client.cnpj}
                </p>
              </div>
              
              <div className="pt-2">
                <Button className="w-full">Avançar Etapa</Button>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="history">
            <TabsList className="w-full">
              <TabsTrigger value="history" className="flex-1">Histórico</TabsTrigger>
              <TabsTrigger value="notes" className="flex-1">Anotações</TabsTrigger>
            </TabsList>
            <TabsContent value="history" className="mt-2">
              <Card>
                <CardContent className="p-4 max-h-64 overflow-y-auto">
                  <ul className="space-y-3">
                    <li className="relative pl-6 pb-3 border-l-2 border-blue-500">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                      <p className="text-sm font-medium">Verificação de crédito concluída</p>
                      <p className="text-xs text-muted-foreground">15/10/2023 - 14:32</p>
                    </li>
                    <li className="relative pl-6 pb-3 border-l-2 border-blue-500">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                      <p className="text-sm font-medium">Documentos recebidos e validados</p>
                      <p className="text-xs text-muted-foreground">15/10/2023 - 10:15</p>
                    </li>
                    <li className="relative pl-6">
                      <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-blue-500" />
                      <p className="text-sm font-medium">Processo iniciado</p>
                      <p className="text-xs text-muted-foreground">15/10/2023 - 09:00</p>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="notes" className="mt-2">
              <Card>
                <CardContent className="p-4">
                  <textarea 
                    className="w-full h-32 p-2 border rounded-md"
                    placeholder="Adicionar anotações ao processo..."
                  />
                  <Button className="mt-2">Salvar Anotações</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default FlowEditor;

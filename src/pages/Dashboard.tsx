
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockProcessList } from "../data/mockData";
import { formatCurrency, formatDate, formatStatus, getStatusColor } from "../utils/formatters";
import { BarChart3, Clock, CreditCard, FileText, TrendingUp, MoreHorizontal, ArrowRight } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { CreditProcess } from "../types/creditProcess";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [processes] = useState(mockProcessList);
  const navigate = useNavigate();

  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      in_progress: 0,
      approved: 0,
      rejected: 0,
    };

    processes.forEach((process) => {
      counts[process.status as keyof typeof counts]++;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  const getTotalValue = () => {
    return processes.reduce((total, process) => total + process.value, 0);
  };

  const handleViewProcess = (process: CreditProcess) => {
    navigate(`/flow-editor?id=${process.id}`);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard de Processos</h1>
        <Button onClick={() => navigate("/flow-editor")}>Novo Processo</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Processos Totais</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{processes.length}</div>
            <p className="text-xs text-muted-foreground">
              +{statusCounts.pending} novos este mês
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Em Análise</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusCounts.in_progress}</div>
            <div className="w-full bg-gray-200 h-1 mt-2">
              <div 
                className="bg-blue-500 h-1" 
                style={{ width: `${(statusCounts.in_progress / processes.length) * 100}%` }} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((statusCounts.approved / Math.max(statusCounts.approved + statusCounts.rejected, 1)) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {statusCounts.approved} aprovados, {statusCounts.rejected} rejeitados
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(getTotalValue())}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(statusCounts.approved * 100000)} aprovados
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="in_progress">Em Análise</TabsTrigger>
            <TabsTrigger value="approved">Aprovados</TabsTrigger>
            <TabsTrigger value="rejected">Rejeitados</TabsTrigger>
          </TabsList>
          <div className="flex items-center">
            <BarChart3 className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Ver relatórios</span>
          </div>
        </div>
        
        <TabsContent value="all" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Processos de Crédito</CardTitle>
              <CardDescription>
                Gerencie todos os processos de crédito em andamento.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processes.map((process) => (
                  <Card key={process.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex items-center justify-between p-4">
                        <div className="space-y-1">
                          <h3 className="font-medium">{process.title}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(process.status)}>
                              {formatStatus(process.status)}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(process.requestDate)}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(process.value)}</p>
                          <p className="text-xs text-muted-foreground">
                            {process.currentStep ? "Etapa atual: " + process.currentStep : ""}
                          </p>
                        </div>
                      </div>
                      <div className="bg-muted p-4 flex justify-between items-center">
                        <div>
                          <p className="text-sm">Cliente: {process.client.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {process.client.cpf || process.client.cnpj}
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          onClick={() => handleViewProcess(process)}
                          className="flex items-center"
                        >
                          Ver detalhes
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <p className="text-sm text-muted-foreground">
                Exibindo {processes.length} processos de crédito
              </p>
              <Button variant="outline">Ver mais</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="pending">
          {/* Conteúdo filtrado por status pendente */}
          <Card>
            <CardContent className="pt-6">
              <p>Processos pendentes.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="in_progress">
          {/* Conteúdo filtrado por status em análise */}
          <Card>
            <CardContent className="pt-6">
              <p>Processos em análise.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="approved">
          {/* Conteúdo filtrado por status aprovado */}
          <Card>
            <CardContent className="pt-6">
              <p>Processos aprovados.</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rejected">
          {/* Conteúdo filtrado por status rejeitado */}
          <Card>
            <CardContent className="pt-6">
              <p>Processos rejeitados.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;

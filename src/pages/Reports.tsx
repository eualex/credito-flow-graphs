
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const Reports = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Relatórios de Processos</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Página de Relatórios</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Esta página será implementada para exibir gráficos e estatísticas dos processos de crédito.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;

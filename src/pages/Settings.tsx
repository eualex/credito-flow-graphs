
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const Settings = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Configurações</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Página de Configurações</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Esta página será implementada para gerenciar as configurações do sistema.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;

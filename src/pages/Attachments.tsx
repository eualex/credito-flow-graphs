
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { mockAttachments, mockProcessList } from "../data/mockData";
import { Attachment } from "../types/creditProcess";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import AttachmentsList from "../components/Attachments/AttachmentsList";
import AttachmentUploader from "../components/Attachments/AttachmentUploader";

const Attachments = () => {
  const [selectedProcessId, setSelectedProcessId] = useState(mockProcessList[0].id);
  const [attachments, setAttachments] = useState<Attachment[]>(mockAttachments);
  
  const filteredAttachments = attachments.filter(
    (attachment) => attachment.processId === selectedProcessId
  );
  
  const handleDelete = (id: string) => {
    setAttachments((prev) => prev.filter((attachment) => attachment.id !== id));
  };
  
  const handleUploadComplete = () => {
    // Em um sistema real, recarregaríamos os anexos do servidor
    console.log("Upload completo");
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Anexos de Processos</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Selecione um processo</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedProcessId}
            onValueChange={(value) => setSelectedProcessId(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um processo" />
            </SelectTrigger>
            <SelectContent>
              {mockProcessList.map((process) => (
                <SelectItem key={process.id} value={process.id}>
                  {process.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="view">
        <TabsList className="w-full">
          <TabsTrigger value="view" className="flex-1">Visualizar Anexos</TabsTrigger>
          <TabsTrigger value="upload" className="flex-1">Enviar Anexos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="view" className="mt-4">
          <AttachmentsList 
            attachments={filteredAttachments}
            onDelete={handleDelete}
          />
        </TabsContent>
        
        <TabsContent value="upload" className="mt-4">
          <AttachmentUploader 
            processId={selectedProcessId}
            onUploadComplete={handleUploadComplete}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Attachments;

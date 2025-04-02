
import { File, FileText, Image, Paperclip, Download, Trash2 } from "lucide-react";
import { Attachment } from "../../types/creditProcess";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useToast } from "../../hooks/use-toast";

interface AttachmentsListProps {
  attachments: Attachment[];
  onDelete?: (id: string) => void;
}

const AttachmentsList = ({ attachments, onDelete }: AttachmentsListProps) => {
  const { toast } = useToast();
  
  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <Image className="h-5 w-5 text-purple-500" />;
    if (type === "application/pdf") return <FileText className="h-5 w-5 text-red-500" />;
    return <File className="h-5 w-5 text-blue-500" />;
  };
  
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1048576).toFixed(1) + " MB";
  };
  
  const handleDownload = (attachment: Attachment) => {
    // Em um sistema real, isso iria fazer o download do arquivo
    toast({
      title: "Download iniciado",
      description: `Baixando ${attachment.name}`,
    });
  };
  
  const handleDelete = (id: string) => {
    if (onDelete) {
      onDelete(id);
      toast({
        title: "Anexo removido",
        description: "O arquivo foi removido com sucesso.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Paperclip className="mr-2 h-5 w-5" />
          <span>Anexos do Processo</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {attachments.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum anexo encontrado para este processo.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attachments.map((attachment) => (
                <TableRow key={attachment.id}>
                  <TableCell>{getFileIcon(attachment.type)}</TableCell>
                  <TableCell>{attachment.name}</TableCell>
                  <TableCell>{formatFileSize(attachment.size)}</TableCell>
                  <TableCell>{new Date(attachment.uploadDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(attachment)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(attachment.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default AttachmentsList;

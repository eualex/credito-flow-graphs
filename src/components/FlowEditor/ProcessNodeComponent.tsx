
import { memo, useState } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import { Clock, DollarSign, Check } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../components/ui/tooltip";

// Define proper node data type
export interface ProcessNodeData {
  label: string;
  time?: number;
  value?: number;
  isCompleted?: boolean;
  description?: string;
}

const ProcessNodeComponent = memo(({ id, type, data, selected }: NodeProps<ProcessNodeData>) => {
  const [showDetails, setShowDetails] = useState(false);
  // Ensure data is properly typed
  const nodeData = data as ProcessNodeData;

  const getBorderColor = () => {
    switch (type) {
      case "step":
        return "border-credit-blue-500";
      case "decision":
        return "border-credit-green-500";
      case "document":
        return "border-credit-gray-500";
      case "end":
        return "border-credit-red-500";
      default:
        return "border-credit-blue-500";
    }
  };

  const getBackgroundColor = () => {
    if (nodeData.isCompleted) return "bg-green-50";
    if (selected) return "bg-blue-50";
    return "bg-white";
  };

  const nodeClasses = `${getBackgroundColor()} ${getBorderColor()} shadow-md transition-all duration-200 ${
    type === "decision" ? "rounded-full flex items-center justify-center aspect-square" : "rounded-md"
  }`;

  return (
    <div
      className={nodeClasses}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {/* Handles de conexão */}
      <Handle type="target" position={Position.Top} className="w-2 h-2" />
      <Handle type="source" position={Position.Bottom} className="w-2 h-2" />

      {/* Conteúdo do nó */}
      <div className="p-2 flex flex-col items-center">
        <div className="font-medium text-sm text-center">{nodeData.label}</div>
        
        <div className="flex space-x-2 mt-2">
          {nodeData.time && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{nodeData.time}min</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tempo estimado: {nodeData.time} minutos</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
          
          {nodeData.value && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge variant="outline" className="flex items-center space-x-1">
                    <DollarSign className="h-3 w-3" />
                    <span>R${nodeData.value}</span>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Valor: R$ {nodeData.value}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}

          {nodeData.isCompleted && (
            <Badge className="bg-green-500 flex items-center space-x-1">
              <Check className="h-3 w-3" />
              <span>Concluído</span>
            </Badge>
          )}
        </div>

        {/* Descrição expandida no hover */}
        {showDetails && nodeData.description && (
          <div className="absolute bg-white border border-gray-200 rounded-md shadow-lg p-2 text-xs w-48 z-10 -bottom-16 left-1/2 transform -translate-x-1/2">
            {nodeData.description}
          </div>
        )}
      </div>
    </div>
  );
});

export default ProcessNodeComponent;

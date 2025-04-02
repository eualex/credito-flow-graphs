
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileText,
  Home,
  PieChart,
  Settings,
  Paperclip,
  GitBranch,
} from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: Home },
  { path: "/flow-editor", label: "Editor de Processos", icon: GitBranch },
  { path: "/attachments", label: "Anexos", icon: Paperclip },
  { path: "/reports", label: "Relatórios", icon: BarChart3 },
  { path: "/settings", label: "Configurações", icon: Settings },
];

const SideNav = () => {
  const location = useLocation();

  return (
    <div className="h-screen w-64 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <FileText className="text-credit-blue-500" />
          <h1 className="font-semibold text-xl">CreditoFlow</h1>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-credit-blue-700 flex items-center justify-center text-white font-medium">
            AB
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Analista</p>
            <p className="text-xs text-sidebar-foreground/70">Banco XYZ</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;

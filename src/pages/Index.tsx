
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import Dashboard from "./Dashboard";
import FlowEditor from "./FlowEditor";
import Attachments from "./Attachments";
import Settings from "./Settings";
import Reports from "./Reports";

const Index = () => {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/flow-editor" element={<FlowEditor />} />
        <Route path="/attachments" element={<Attachments />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </MainLayout>
  );
};

export default Index;

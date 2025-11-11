import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Pages/Login";
import Registro from "./Pages/Registro";
import CDTList from "./Pages/CDTList";
import CDTForm from "./Pages/CDTForm";
import Simulador from "./Pages/simulador";
import AdminDashboard from "./Pages/AdminDashboard";
import AgenteDashboard from "./Pages/AgenteDashboard";
import ForgotPassword from "./Pages/forgotPassword";
import ResetPassword from "./Pages/ResetPassword";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/cdts" element={<CDTList />} />
        <Route path="/cdts/new" element={<CDTForm />} />
        <Route path="/cdts/edit/:id" element={<CDTForm />} />
        <Route path="/tasas" element={<Simulador />} />
        <Route path="/agente/dashboard" element={<AgenteDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}




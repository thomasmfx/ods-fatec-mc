import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EventoInativo from './components/EventoInativo';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Votacao from './pages/Votacao';
import Confirmacao from './pages/Confirmacao';
import Dashboard from './pages/Dashboard';
import AdminPropostas from './pages/Admin';

export default function App() {
  const eventoAtivo = import.meta.env.VITE_EVENTO_ATIVO !== 'false';

  return (
    <BrowserRouter>
      <Routes>
        {/* Se o evento estiver ativo, renderiza a página. Se não, joga pro EventoInativo */}
        <Route path="/" element={eventoAtivo ? <Login /> : <EventoInativo />} />
        <Route
          path="/cadastro"
          element={eventoAtivo ? <Cadastro /> : <EventoInativo />}
        />
        <Route
          path="/votacao"
          element={eventoAtivo ? <Votacao /> : <EventoInativo />}
        />
        <Route
          path="/confirmacao"
          element={eventoAtivo ? <Confirmacao /> : <EventoInativo />}
        />
        {/* O Dashboard fica aberto independente do status do evento */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPropostas />} />
      </Routes>
    </BrowserRouter>
  );
}

import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import Login from './pages/Login/Login'
// import Cadastro from './pages/Cadastro/Cadastro'
// import Votacao from './pages/Votacao/Votacao'
// import Confirmacao from './pages/Confirmacao/Confirmacao'
// import Dashboard from './pages/Dashboard/Dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/votacao" element={<Votacao />} />
        <Route path="/confirmacao" element={<Confirmacao />} />
        <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  )
}
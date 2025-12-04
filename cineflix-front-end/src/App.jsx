import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Details from "./pages/Details";
import DetailsLocal from "./pages/DetailsLocal";
import Favoritos from "./pages/Favoritos";
import Header from "./components/Header";

function AppContent() {
  const location = useLocation();

  // TELAS ONDE NÃO MOSTRA O HEADER
  const hideHeader =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <>
      {!hideHeader && <Header />}

      <Routes>

        {/* 🔥 ROTA RAIZ AGORA REDIRECIONA PRO LOGIN */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas protegidas depois */}
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/details-local/:id" element={<DetailsLocal />} />
        <Route path="/favoritos" element={<Favoritos />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

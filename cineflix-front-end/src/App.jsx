import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Details from "./pages/Details";
import DetailsLocal from "./pages/DetailsLocal";
import Favoritos from "./pages/Favoritos";
import Header from "./components/Header";

// Componente para rotas privadas
function PrivateRoute({ children }) {
  const isLoggedIn = !!localStorage.getItem("token"); // ajusta conforme você guarda o token
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}

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
        {/* ROTA RAIZ: redireciona conforme login */}
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Rotas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rotas privadas */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <PrivateRoute>
              <Details />
            </PrivateRoute>
          }
        />
        <Route
          path="/details-local/:id"
          element={
            <PrivateRoute>
              <DetailsLocal />
            </PrivateRoute>
          }
        />
        <Route
          path="/favoritos"
          element={
            <PrivateRoute>
              <Favoritos />
            </PrivateRoute>
          }
        />
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

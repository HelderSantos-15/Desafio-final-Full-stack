import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import loginBG from "../img/img4.jpg"; // 👉 coloque sua imagem aqui

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://desafio-final-full-stack.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, senha }),
      });

      if (!response.ok) {
        alert("Usuário ou senha incorretos");
        return;
      }

      const usuario = await response.json();

      // ✔ SALVA USUÁRIO NO LOCALSTORAGE
      localStorage.setItem("user", JSON.stringify(usuario));

      // ✔ REDIRECIONA SEM PRECISAR DE "OK"
      navigate("/home");
    } catch (err) {
      alert("Erro ao conectar ao servidor");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${loginBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Paper
        sx={{
          p: 4,
          maxWidth: 400,
          width: "100%",
          bgcolor: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(10px)",
          borderRadius: 3,
          color: "#fff",
          boxShadow: "0 8px 25px rgba(0,0,0,0.6)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" textAlign="center" mb={3}>
          Login
        </Typography>

        <form
          onSubmit={handleLogin}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          <TextField
            label="Nome"
            variant="outlined"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            InputProps={{ sx: { color: "#fff" } }}
            InputLabelProps={{ sx: { color: "#ccc" } }}
            sx={{ bgcolor: "rgba(255,255,255,0.05)", borderRadius: 1 }}
          />

          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            InputProps={{ sx: { color: "#fff" } }}
            InputLabelProps={{ sx: { color: "#ccc" } }}
            sx={{ bgcolor: "rgba(255,255,255,0.05)", borderRadius: 1 }}
          />

          {/* BOTÃO ESTILIZADO */}
          <Button
            type="submit"
            variant="contained"
            sx={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              fontWeight: "bold",
              padding: "10px 0",
              borderRadius: "10px",
              fontSize: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #5b0eb3, #1f63d6)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.45)",
              },
            }}
          >
            Entrar
          </Button>
        </form>

        <Typography color="#ccc" mt={2} textAlign="center">
          Não tem conta?{" "}
          <span
            style={{
              color: "#4c9eff",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/register")}
          >
            Cadastre-se
          </span>
        </Typography>
      </Paper>
    </Box>
  );
}

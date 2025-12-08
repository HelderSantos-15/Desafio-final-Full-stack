import { useParams, useNavigate } from "react-router-dom"; // ⬅️ ADICIONADO useNavigate
import { useEffect, useState } from "react";
// CORREÇÃO 1: Ajuste o caminho para ser RELATIVO ao arquivo (ex: um nível acima)
// Assumindo que 'img' está na raiz do seu frontend, use o caminho relativo correto.
// Substitua '../img/cinema06_12.jpg' pelo caminho RELATIVO correto da sua imagem!
import minhaImagem from '../img/cinema06_12.jpg'; 

// O backend deve ser exportado do seu api.js
import { backend } from "../services/api"; 
import { Box, Typography, CircularProgress, Button } from "@mui/material"; // ⬅️ ADICIONADO Button

export default function DetailsLocal() {
  const { id } = useParams();
  const navigate = useNavigate(); // ⬅️ DEFINIDO navigate
  const [filme, setFilme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      try {
        // Chama o endpoint do seu backend: /filmes/{id}
        const res = await backend.get(`/filmes/${id}`);
        setFilme(res.data);
      } catch (err) {
        alert("Erro ao carregar detalhes do filme local!");
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  if (!filme)
    return <Typography color="#fff">Filme não encontrado!</Typography>;

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#141414",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      {/* ⬅️ BOTÃO VOLTAR PARA HOME */}
      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 3 }}
        onClick={() => navigate("/home")}
      >
        ⬅️ Voltar para Home
      </Button>

      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <img
          // CORREÇÃO 2: Use o nome da variável de importação dentro de chaves {}
          src={minhaImagem}
          alt={filme.titulo}
          style={{ borderRadius: 8, width: "300px" }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold">
            {filme.titulo} ({filme.ano})
          </Typography>

          <Typography variant="subtitle1" color="#aaa" sx={{ mt: 1 }}>
            Categoria: {filme.categoria?.nome || "Sem categoria"}
          </Typography>

          <Typography variant="body2" color="#ccc" sx={{ mt: 1 }}>
            Nota: ⭐ {filme.nota}
          </Typography>

          <Typography variant="body2" color="#ccc" sx={{ mt: 1 }}>
            Diretor: {filme.diretor}
          </Typography>
          
          <Typography variant="body1" sx={{ mt: 2 }}>
            {filme.descricao}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
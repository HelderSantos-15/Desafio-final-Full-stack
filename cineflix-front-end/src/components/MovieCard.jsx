import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

import minhaImagem from "../img/cinema06_12.jpg";

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const [isFavorito, setIsFavorito] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isTMDB = !!movie.poster_path;

  const titulo = movie.title || movie.titulo;
  const descricao = movie.overview || movie.descricao;
  const nota = movie.vote_average || movie.nota || "—";

  // ✅ Corrigido: usar imagem local para filmes do backend
  const poster = isTMDB
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : minhaImagem;

  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setIsFavorito(storedFavoritos.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorito = (e) => {
    e.stopPropagation();
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    const updatedFavoritos = isFavorito
      ? storedFavoritos.filter(fav => fav.id !== movie.id)
      : [...storedFavoritos, movie];

    localStorage.setItem("favoritos", JSON.stringify(updatedFavoritos));
    setIsFavorito(!isFavorito);
  };

  const abrirDetalhes = () => {
    if (isTMDB) {
      navigate(`/details/${movie.id}`);
    } else {
      navigate(`/details-local/${movie.id}`);
    }
  };

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={abrirDetalhes}
      sx={{
        width: 200,
        height: 380,
        bgcolor: "#1e1e1e",
        color: "#fff",
        borderRadius: 3,
        overflow: "hidden",
        m: 1,
        position: "relative",
        cursor: "pointer",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.3s, box-shadow 0.3s",
        boxShadow: hovered
          ? "0 12px 24px rgba(0,0,0,0.6)"
          : "0 2px 6px rgba(0,0,0,0.3)"
      }}
    >
      <CardMedia
        component="img"
        image={poster}
        alt={titulo}
        sx={{ height: 280, objectFit: "cover" }}
      />

      {hovered && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: 280,
            bgcolor: "rgba(0,0,0,0.7)",
            color: "#fff",
            p: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end"
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" noWrap>
            {titulo}
          </Typography>

          <Typography variant="body2" sx={{ mt: 0.5 }}>
            Nota: {nota} ⭐
          </Typography>

          <Typography variant="body2" sx={{ mt: 0.5 }} noWrap>
            {descricao}
          </Typography>

          {!isTMDB && movie.categoria?.nome && (
            <Typography variant="caption" sx={{ mt: 1, color: "#9cf" }}>
              Categoria: {movie.categoria.nome}
            </Typography>
          )}
        </Box>
      )}

      <Box sx={{ position: "absolute", top: 5, right: 5, zIndex: 10 }}>
        <IconButton
          onClick={toggleFavorito}
          sx={{
            color: isFavorito ? "#FFD700" : "#aaa",
            transition: "color 0.3s, transform 0.2s",
            "&:hover": {
              color: isFavorito ? "#FFC107" : "#fff",
              transform: "scale(1.2)"
            }
          }}
        >
          <StarIcon />
        </IconButton>
      </Box>

      <CardContent sx={{ p: 1 }}>
        <Typography variant="subtitle1" fontWeight="bold" noWrap>
          {titulo}
        </Typography>
      </CardContent>
    </Card>
  );
}

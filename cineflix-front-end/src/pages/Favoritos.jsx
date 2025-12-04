import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const storedFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    setFavoritos(storedFavoritos);
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#121212",
        minHeight: "100vh",
        color: "#fff",
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
        ⭐ Meus Favoritos
      </Typography>

      {favoritos.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            overflowX: "auto",
            gap: 2,
            pb: 2,
            "&::-webkit-scrollbar": { display: "none" }, // esconde a barra de rolagem
          }}
        >
          {favoritos.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            color: "#ccc",
            textAlign: "center",
            width: "100%",
            mt: 5,
            fontSize: 18,
          }}
        >
          Nenhum filme favoritado ainda 🤔
        </Box>
      )}
    </Box>
  );
}

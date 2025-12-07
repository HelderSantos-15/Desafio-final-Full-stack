home

import { useEffect, useState } from "react";
import {
  TextField,
  CircularProgress,
  Box,
  Pagination,
  Chip,
  Stack,
  Paper,
  Typography,
} from "@mui/material";

import MovieCard from "../components/MovieCard";
import {
  getPopularMovies,
  searchMovies,
  getFilmesBackend,
  getCategorias,
} from "../services/api";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [localMovies, setLocalMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategorias(data);
      } catch (err) {
        console.log("Erro ao carregar categorias:", err);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const fetchMovies = async () => {
        setLoading(true);
        try {
          const localData = await getFilmesBackend(
            page - 1,
            20,
            search.trim() || null,
            categoriaSelecionada || null
          );

          setLocalMovies(localData.results);

          let tmdbData = { results: [], total_pages: 1 };

          if (search.trim()) {
            tmdbData = await searchMovies(search, page);
          } else {
            tmdbData = await getPopularMovies(page);
          }

          setMovies(tmdbData.results);
          setTotalPages(
            tmdbData.total_pages > 500 ? 500 : tmdbData.total_pages
          );
        } catch (err) {
          alert("Erro ao carregar filmes!");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchMovies();
    }, 800);

    return () => clearTimeout(delayDebounce);
  }, [page, search, categoriaSelecionada]);

  const filmesFinal = [
    ...localMovies,
    ...movies.filter((m) => !localMovies.some((lm) => lm.id === m.id)),
  ];

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#121212",
        p: 3,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: "1300px",
          bgcolor: "#1e1e1e",
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#fff"
          mb={3}
          textAlign="center"
        >
          Catálogo de Filmes
        </Typography>

        {/* 🔎 Busca */}
        <TextField
          label="Buscar Filme"
          variant="outlined"
          fullWidth
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          sx={{
            marginBottom: 3,
            bgcolor: "#121212",
            borderRadius: 1,
            input: { color: "#fff" },
            label: { color: "#aaa" },
          }}
        />

        {/* 🔹 Categorias */}
        {categorias.length > 0 && (
          <Stack direction="row" spacing={1} sx={{ mb: 3, overflowX: "auto" }}>
            <Chip
              label="Todas"
              clickable
              color={categoriaSelecionada === "" ? "primary" : "default"}
              onClick={() => setCategoriaSelecionada("")}
              sx={{ color: "#fff" }}
            />

            {categorias.map((cat) => (
              <Chip
                key={cat.id}
                label={cat.nome}
                clickable
                color={
                  categoriaSelecionada === String(cat.id)
                    ? "primary"
                    : "default"
                }
                onClick={() => setCategoriaSelecionada(String(cat.id))}
                sx={{ color: "#fff" }}
              />
            ))}
          </Stack>
        )}

        {/* 🎬 GRID DE FILMES */}
        {filmesFinal.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
              gap: 2,
              justifyContent: "center",
            }}
          >
            {filmesFinal.map((m) => (
              <MovieCard
                key={m.id + (m.poster_path ? "_tmdb" : "_local")}
                movie={m}
              />
            ))}
          </Box>
        ) : (
          <Typography color="#ccc" textAlign="center" mt={4}>
            Nenhum filme encontrado 😢
          </Typography>
        )}

        {/* 📄 Paginação */}
        <Pagination
          count={totalPages}
          page={page}
          onChange={(e, value) => setPage(value)}
          sx={{
            marginTop: 4,
            display: "flex",
            justifyContent: "center",
            "& .MuiPaginationItem-root": { color: "#fff" },
          }}
        />
      </Paper>
    </Box>
  );
}


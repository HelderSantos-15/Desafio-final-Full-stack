import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails, getMovieTrailer } from "../services/api";
import { Button, Box, Typography, CircularProgress } from "@mui/material";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await getMovieDetails(id);
        setMovie(data);

        const trailer = await getMovieTrailer(id);
        if (trailer?.results?.length > 0) {
          setTrailerKey(trailer.results[0].key);
        }
      } catch (err) {
        alert("Erro ao carregar detalhes!");
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) return <Typography color="#fff">Filme não encontrado!</Typography>;

  return (
    <Box sx={{ padding: 4, backgroundColor: "#141414", minHeight: "100vh", color: "#fff" }}>
      
      <Box display="flex" flexDirection={{ xs: "column", md: "row" }} gap={4}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={{ borderRadius: 8, width: "300px" }}
        />

        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold">
            {movie.title}({movie.release_date?.split("-")[0]})
          </Typography>

          <Typography variant="subtitle1" color="#aaa" sx={{ mt: 1 }}>
            {movie.genres?.map(g => g.name).join(", ")} | {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
          </Typography>

          <Typography variant="body2" color="#ccc" sx={{ mt: 1 }}>
            Avaliação: ⭐{movie.vote_average} ({movie.vote_count} votos)
          </Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            {movie.overview}
          </Typography>

          {trailerKey && (
            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Trailer
              </Typography>
              <Box sx={{ position: "relative", paddingTop: "56.25%" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}`}
                  title="Trailer"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: 8,
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

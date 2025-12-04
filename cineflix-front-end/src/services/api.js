import axios from "axios";

/* ----------------------------
   API DO TMDB 
----------------------------- */
const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: apiKey,
    language: "pt-BR",
  },
});

export const getPopularMovies = async (page = 1) => {
  const response = await tmdb.get("/movie/popular", { params: { page } });
  return response.data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await tmdb.get("/search/movie", { params: { query, page } });
  return response.data;
};

export const getMovieDetails = async (id) => {
  const res = await tmdb.get(`/movie/${id}`);
  return res.data;
};

export const getMovieTrailer = async (id) => {
  const res = await tmdb.get(`/movie/${id}/videos`);
  return res.data;
};

/* ----------------------------
   API DO SEU BACKEND LOCAL (ATUALIZADO)
----------------------------- */
export const backend = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 10000,
});

// Busca, Filtra e Lista Filmes do seu Backend (Retorna Page<Filme> formatado)
export const getFilmesBackend = async (page = 0, size = 20, titulo = null, categoriaId = null) => {
    const params = { page, size };
    if (titulo) {
        params.titulo = titulo;
    }
    if (categoriaId) {
        params.categoriaId = categoriaId;
    }

    const res = await backend.get("/filmes", { params });
    
    // Normaliza a resposta do Spring Page para o formato que o Front-end espera do TMDB
    return {
        results: res.data.content,
        total_pages: res.data.totalPages,
        page: res.data.number + 1
    };
};

export const getCategorias = async () => {
  const res = await backend.get("/categorias");
  return res.data;
};

export default { tmdb, backend };
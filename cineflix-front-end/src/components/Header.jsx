import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const u = localStorage.getItem("user");
    setLogado(!!u);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLogado(false);
    navigate("/login");
  };

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "#1976d2",
        boxShadow: "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1.5,
        }}
      >
        {/* Logo */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        >
          🎬 CineFlix
        </Typography>

        {/* Menu */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {!logado && (
            <>
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#fff",
                  fontSize: "15px",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
                }}
              >
                Login
              </Button>

              <Button
                component={Link}
                to="/register"
                sx={{
                  color: "#fff",
                  fontSize: "15px",
                  border: "1px solid #fff",
                  borderRadius: "8px",
                  px: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                Criar Conta
              </Button>
            </>
          )}

          {logado && (
            <>
              <Button
                component={Link}
                to="/"
                sx={{
                  color: "#fff",
                  fontSize: "15px",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
                }}
              >
                Home
              </Button>

              <Button
                component={Link}
                to="/favoritos"
                sx={{
                  color: "#fff",
                  fontSize: "15px",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
                }}
              >
                Favoritos
              </Button>

              <Button
                onClick={handleLogout}
                sx={{
                  color: "#fff",
                  fontSize: "15px",
                  border: "1px solid #fff",
                  borderRadius: "8px",
                  px: 2,
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                }}
              >
                Sair
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

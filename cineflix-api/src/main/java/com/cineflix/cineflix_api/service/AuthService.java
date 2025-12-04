package com.cineflix.cineflix_api.service;

import com.cineflix.cineflix_api.dto.LoginRequest;
import com.cineflix.cineflix_api.dto.RegisterRequest;
import com.cineflix.cineflix_api.model.Usuario;
import com.cineflix.cineflix_api.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UsuarioRepository repo;

    public AuthService(UsuarioRepository repo) {
        this.repo = repo;
    }

    public Usuario registrar(RegisterRequest request) {
        Optional<Usuario> existente = repo.findByNome(request.getNome());
        if (existente.isPresent()) {
            throw new RuntimeException("Usuário já existe!");
        }
        Usuario novo = new Usuario(request.getNome(), request.getSenha());
        return repo.save(novo);
    }

    public Usuario login(LoginRequest request) {
        Usuario usuario = repo.findByNome(request.getNome())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!usuario.getSenha().equals(request.getSenha())) {
            throw new RuntimeException("Senha incorreta");
        }
        return usuario;
    }
}

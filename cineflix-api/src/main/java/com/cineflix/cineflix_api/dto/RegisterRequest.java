package com.cineflix.cineflix_api.dto;

public class RegisterRequest {
    private String nome;
    private String senha;

    public RegisterRequest() {}

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}

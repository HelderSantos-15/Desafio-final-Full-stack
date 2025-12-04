package com.cineflix.cineflix_api.service;

import com.cineflix.cineflix_api.model.Filme;
import com.cineflix.cineflix_api.repository.FilmeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FilmeService {

    private final FilmeRepository repository;

    public FilmeService(FilmeRepository repository) {
        this.repository = repository;
    }

    public List<Filme> findAll() {
        return repository.findAll();
    }

    public Filme save(Filme filme) {
        return repository.save(filme);
    }
}

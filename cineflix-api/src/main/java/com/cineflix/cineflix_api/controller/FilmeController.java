package com.cineflix.cineflix_api.controller;

import com.cineflix.cineflix_api.model.Filme;
import com.cineflix.cineflix_api.model.Categoria;
import com.cineflix.cineflix_api.repository.FilmeRepository;
import com.cineflix.cineflix_api.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/filmes")
public class FilmeController {

    @Autowired
    private FilmeRepository filmeRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @GetMapping
    public Page<Filme> listarFilmes(
            @RequestParam(required = false) String titulo,
            @RequestParam(required = false) Long categoriaId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        if (titulo != null && !titulo.isEmpty()) {
            return filmeRepository.findByTituloContainingIgnoreCase(titulo, pageable);
        }

        if (categoriaId != null) {
            return filmeRepository.findByCategoriaId(categoriaId, pageable);
        }

        return filmeRepository.findAll(pageable);
    }

    @GetMapping("/{id}")
    public Filme buscarPorId(@PathVariable Long id) {
        return filmeRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Filme criar(@RequestBody Filme filme) {
        if (filme.getCategoria() != null && filme.getCategoria().getId() != null) {
            Categoria categoria = categoriaRepository.findById(filme.getCategoria().getId()).orElse(null);
            filme.setCategoria(categoria);
        }
        return filmeRepository.save(filme);
    }

    @PutMapping("/{id}")
    public Filme atualizar(@PathVariable Long id, @RequestBody Filme filme) {
        Filme existente = filmeRepository.findById(id).orElse(null);
        if (existente == null) return null;

        existente.setTitulo(filme.getTitulo());
        existente.setDescricao(filme.getDescricao());
        existente.setAno(filme.getAno());
        existente.setDiretor(filme.getDiretor());
        existente.setNota(filme.getNota());

        if (filme.getCategoria() != null && filme.getCategoria().getId() != null) {
            Categoria categoria = categoriaRepository.findById(filme.getCategoria().getId()).orElse(null);
            existente.setCategoria(categoria);
        }

        return filmeRepository.save(existente);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        filmeRepository.deleteById(id);
    }
}

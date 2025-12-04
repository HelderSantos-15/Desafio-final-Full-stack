// src/main/java/com/cineflix/cineflix_api/repository/FilmeRepository.java
package com.cineflix.cineflix_api.repository;

import com.cineflix.cineflix_api.model.Filme;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FilmeRepository extends JpaRepository<Filme, Long> {

    // OK! Métodos de busca e filtro para o Controller
    Page<Filme> findByTituloContainingIgnoreCase(String titulo, Pageable pageable);
    Page<Filme> findByCategoriaId(Long categoriaId, Pageable pageable);
    Page<Filme> findByAno(Integer ano, Pageable pageable);
}
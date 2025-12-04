package com.cineflix.cineflix_api.repository;

import com.cineflix.cineflix_api.model.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    // Aqui você pode adicionar queries custom, ex:
    // Optional<Categoria> findByNome(String nome);
}

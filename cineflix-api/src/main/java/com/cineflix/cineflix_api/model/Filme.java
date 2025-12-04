package com.cineflix.cineflix_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Filme {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String descricao;
    private Integer ano;
    private String diretor;
    private Double nota;

    @ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
}

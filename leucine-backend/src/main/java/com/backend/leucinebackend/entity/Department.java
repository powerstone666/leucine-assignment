package com.backend.leucinebackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
}

package com.backend.leucinebackend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class StudentProfile {

    @Id
    private Long userId;

    private String photo;

    private String year;

    @ManyToOne
    @JoinColumn(name = "department_id", nullable = false)
    private Department department;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
}

package com.backend.leucinebackend.repository;

import com.backend.leucinebackend.entity.FacultyProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacultyProfileRepository extends JpaRepository<FacultyProfile, Long> {
    // Additional custom queries can be defined here if needed
    List<FacultyProfile> findByUserId(Long userId);
}

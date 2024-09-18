package com.backend.leucinebackend.repository;

import com.backend.leucinebackend.entity.StudentProfile;
import com.backend.leucinebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentProfileRepository extends JpaRepository<StudentProfile, Long> {
    // Additional custom queries can be defined here if needed
  List<StudentProfile> findByUserId(int userId);
    void deleteByUserId(Long userId);

}

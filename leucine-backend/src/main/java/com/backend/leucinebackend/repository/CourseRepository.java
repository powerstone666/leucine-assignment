package com.backend.leucinebackend.repository;

import com.backend.leucinebackend.entity.Course;
import com.backend.leucinebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
  

}

package com.backend.leucinebackend.controller;

import com.backend.leucinebackend.entity.FacultyProfile;
import com.backend.leucinebackend.entity.StudentProfile;
import com.backend.leucinebackend.repository.FacultyProfileRepository;
import com.backend.leucinebackend.repository.StudentProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Faculty {

    @Autowired
    private StudentProfileRepository studentProfileRepository;
    @Autowired
    private FacultyProfileRepository facultyProfileRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/faculty")
    public List<FacultyProfile> getFaculty() {
        return facultyProfileRepository.findByUserId(2L);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/studentcourse")
    public  List<StudentProfile> getStudentCourse() {
        return studentProfileRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/facultyupdate")
    public ResponseEntity<FacultyProfile> updateFaculty(@RequestBody FacultyProfile updatedFaculty) {
        FacultyProfile existingFaculty = facultyProfileRepository.findById(2L).orElse(null);

        if (existingFaculty != null) {
            existingFaculty.setOfficeHours(updatedFaculty.getOfficeHours());
            existingFaculty.getUser().setEmail(updatedFaculty.getUser().getEmail());
            existingFaculty.getUser().setPhone(updatedFaculty.getUser().getPhone());
            FacultyProfile updated = facultyProfileRepository.save(existingFaculty);
            return ResponseEntity.ok(updated);
        } else {
            // Return a 404 Not Found response if the faculty profile does not exist
            return ResponseEntity.notFound().build();
        }
    }


}

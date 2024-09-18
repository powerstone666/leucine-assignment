package com.backend.leucinebackend.controller;

import com.backend.leucinebackend.entity.*;
import com.backend.leucinebackend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class Student {

    @Autowired
    private UserRepository studentRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/student")
    public List<User> getAllUsers() {
        try {
            System.out.println( studentRepository.findByRole("student"));
            return studentRepository.findByRole("student");
        }
        catch (Exception e) {
            System.out.println("Error: " + e);
            return null;
        }
    }
    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/studentProfile")
    public List<StudentProfile> getAllStudentProfiles() {
        try {
            return studentProfileRepository.findByUserId(4);
        }
        catch (Exception e) {
            System.out.println("Error: " + e);
            return null;
        }
    }
}

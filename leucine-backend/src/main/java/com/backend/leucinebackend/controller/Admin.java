package com.backend.leucinebackend.controller;

import com.backend.leucinebackend.entity.AdministratorProfile;
import com.backend.leucinebackend.entity.User;
import com.backend.leucinebackend.repository.AdministratorProfileRepository;
import com.backend.leucinebackend.repository.StudentProfileRepository;
import com.backend.leucinebackend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class Admin {
    @Autowired
    private AdministratorProfileRepository administratorProfileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentProfileRepository studentProfileRepository;

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/admin")
    public List<AdministratorProfile> getAdmin() {
        return administratorProfileRepository.findByUserId(3);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // Update user
    @CrossOrigin(origins = "http://localhost:5173")
    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setName(updatedUser.getName());
            user.setUsername(updatedUser.getUsername());
            user.setEmail(updatedUser.getEmail());
            user.setPhone(updatedUser.getPhone());
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete user
    @CrossOrigin(origins = "http://localhost:5173")
    @DeleteMapping("/users/{id}")

    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            if (userRepository.existsById(id)) {
                // Delete related records in student_profile table
                studentProfileRepository.deleteByUserId(id); // Ensure this repository method exists

                // Now delete the user
                userRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
            // Log the exception for troubleshooting
            System.err.println("Error deleting user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}

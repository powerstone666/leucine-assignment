package com.backend.leucinebackend.controller;

import com.backend.leucinebackend.entity.AdministratorProfile;
import com.backend.leucinebackend.entity.User;
import com.backend.leucinebackend.repository.AdministratorProfileRepository;
import com.backend.leucinebackend.repository.StudentProfileRepository;
import com.backend.leucinebackend.repository.UserRepository;
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

    @CrossOrigin(origins = "https://leucine-assignment.vercel.app/")
    @GetMapping("/admin")
    public List<AdministratorProfile> getAdmin() {
        return administratorProfileRepository.findByUserId(3);
    }

    @CrossOrigin(origins = "https://leucine-assignment.vercel.app/")
    @GetMapping("/users")
    public List<User> getUsers() {
        return userRepository.findAll();
    }


    @CrossOrigin(origins = "https://leucine-assignment.vercel.app/")
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


    @CrossOrigin(origins = "https://leucine-assignment.vercel.app/")
    @DeleteMapping("/users/{id}")

    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        try {
            if (userRepository.existsById(id)) {
               
                studentProfileRepository.deleteByUserId(id); 

               
                userRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (Exception e) {
          
            System.err.println("Error deleting user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


}

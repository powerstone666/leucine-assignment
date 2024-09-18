package com.backend.leucinebackend.controller;

import com.backend.leucinebackend.dto.LoginRequest;
import com.backend.leucinebackend.services.CustomUserDetailsService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

/*@RestController
public class LoginController {

   private AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;

    public LoginController( CustomUserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
    }
    @CrossOrigin(origins="http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println(loginRequest);
            // Create an authentication token using email and password
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

            // Authenticate the user
            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            // Check if role is valid (you may need to implement role validation here)
            if (authentication.getAuthorities().stream().noneMatch(grantedAuthority -> grantedAuthority.getAuthority().equals(loginRequest.getRole()))) {
                return new ResponseEntity<>("Invalid role", HttpStatus.BAD_REQUEST);
            }

            // Authentication successful
            return new ResponseEntity<>("Login successful", HttpStatus.OK);

        } catch (AuthenticationException e) {
            // Handle authentication failure
            return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
        }
    }
}
*/
package com.uam.useraccountmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.uam.useraccountmanagement.model.Utilisateur;

import com.uam.useraccountmanagement.repository.UtilisateurRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<Utilisateur> registerUser(@RequestBody Utilisateur user) {

        // add check for username exists in a DB
        if (utilisateurRepository.existsByNom(user.getNom())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        // add check for email exists in DB
        if (utilisateurRepository.existsByEmail(user.getEmail())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        utilisateurRepository.save(user);

        return ResponseEntity.ok(user);

    }

    @PostMapping("/login")
    public ResponseEntity<Utilisateur> authenticateUser(@RequestBody Utilisateur user) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                user.getEmail(), user.getPassword()));
        if (authentication != null) {
            user = utilisateurRepository.findByEmail(user.getEmail())
                    .orElseThrow(() -> new UsernameNotFoundException("User email not found : "));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return ResponseEntity.ok(user);
        } else
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("/logout")
    @CrossOrigin(origins = "http://localhost:4200")
    public String logout() {
        return "{\"message\": \"\"}";
    }

}

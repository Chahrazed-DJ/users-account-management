package com.uam.useraccountmanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uam.useraccountmanagement.model.Utilisateur;
import com.uam.useraccountmanagement.repository.UtilisateurRepository;
import com.uam.useraccountmanagement.service.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {
    private final AuthService authService;
    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @Autowired
    private AuthService userService;

    @PostMapping("/register")
    @CrossOrigin(origins = "http://localhost:4200")
    public Utilisateur registerUser(@RequestBody Utilisateur user) {
        return userService.registerUser(user);
    }

    @PostMapping("/login")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Utilisateur> login(@RequestParam String email, @RequestParam String password) {
        if (authService.login(email, password)) {
            Utilisateur utilisateur = utilisateurRepository.findByEmail(email);
            return ResponseEntity.ok(utilisateur);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/logout")
    @CrossOrigin(origins = "http://localhost:4200")
    public String logout() {
        return "{\"message\": \"\"}";
    }

}

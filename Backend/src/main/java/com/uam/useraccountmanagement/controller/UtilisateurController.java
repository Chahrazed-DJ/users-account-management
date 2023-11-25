package com.uam.useraccountmanagement.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.uam.useraccountmanagement.exception.ResourceNotFoundException;
import com.uam.useraccountmanagement.model.Utilisateur;
import com.uam.useraccountmanagement.repository.UtilisateurRepository;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    // Avoir tous les utilisateurs
    @GetMapping("/utilisateurs")
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    // Ajouter un utilisateur rest api
    @PostMapping("/utilisateurs")
    public ResponseEntity<Utilisateur> addUser(@RequestBody Utilisateur user) {

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

    // avoir un utilisateur selon son id rest api (recherche d'un utilisateur)
    @GetMapping("/utilisateurs/{id}")
    public ResponseEntity<Utilisateur> getUserById(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur avec id :" + id + " n'existe pas"));
        return ResponseEntity.ok(utilisateur);
    }

    // modifier les informations d'un utilisateur rest api
    @PutMapping("/utilisateurs/{id}")
    public ResponseEntity<Utilisateur> updateUser(@PathVariable Long id, @RequestBody Utilisateur utilisateurDetails)
            throws Exception {

        // add check for username exists in a DB
        if (utilisateurRepository.existsByNom(utilisateurDetails.getNom())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // add check for email exists in DB
        if (utilisateurRepository.existsByEmail(utilisateurDetails.getEmail())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur avec id :" + id + " n'existe pas"));

        utilisateur.setNom(utilisateurDetails.getNom());
        utilisateur.setEmail(utilisateurDetails.getEmail());
        utilisateur.setPassword(passwordEncoder.encode(utilisateurDetails.getPassword()));
        utilisateur.setRoles(utilisateurDetails.getRoles());

        Utilisateur updatedUser = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(updatedUser);
    }

}

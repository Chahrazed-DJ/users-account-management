package com.uam.useraccountmanagement.controller;

import java.util.List;

import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uam.useraccountmanagement.exception.ResourceNotFoundException;
import com.uam.useraccountmanagement.model.Utilisateur;
import com.uam.useraccountmanagement.repository.UtilisateurRepository;
import com.uam.useraccountmanagement.service.AuthService;

@RestController
@RequestMapping("/api/admin")
public class UtilisateurController {
    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private AuthService userService;

    // Avoir tous les utilisateurs
    @GetMapping("/utilisateurs")
    @CrossOrigin(origins = "http://localhost:4200")
    public List<Utilisateur> getAllUtilisateurs() {
        return utilisateurRepository.findAll();
    }

    // Ajouter un utilisateur rest api
    @PostMapping("/utilisateurs")
    @CrossOrigin(origins = "http://localhost:4200")
    public Utilisateur registerUser(@RequestBody Utilisateur user) throws Exception {
        if ((utilisateurRepository.findByEmail(user.getEmail()) != null)) {
            // Il existe déjà un utilisateur avec le même email
            throw new Exception("Un utilisateur avec cet email existe déjà");

        }
        return userService.registerUser(user);
    }

    // avoir un utilisateur selon son id rest api (recherche d'un utilisateur)
    @GetMapping("/utilisateurs/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Utilisateur> getUserById(@PathVariable Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur avec id :" + id + " n'existe pas"));
        return ResponseEntity.ok(utilisateur);
    }

    // modifier les informations d'un utilisateur rest api
    @PutMapping("/utilisateurs/{id}")
    @CrossOrigin(origins = "http://localhost:4200")
    public ResponseEntity<Utilisateur> updateUser(@PathVariable Long id, @RequestBody Utilisateur utilisateurDetails)
            throws Exception {

        if ((utilisateurRepository.findByEmail(utilisateurDetails.getEmail()) != null)) {
            // Il existe déjà un utilisateur avec le même email, ne pas effectuer la mise à
            // jour
            throw new Exception("Un utilisateur avec cet email existe déjà");

        }

        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur avec id :" + id + " n'existe pas"));

        utilisateur.setNom(utilisateurDetails.getNom());
        utilisateur.setEmail(utilisateurDetails.getEmail());
        // les fonctions de hachage sont irréversibles, il n'y a pas de moyen de
        // récupérer le mot de passe original
        utilisateur.setPassword(DigestUtils.sha256Hex(utilisateurDetails.getPassword()));
        utilisateur.setRoles(utilisateurDetails.getRoles());

        Utilisateur updatedUser = utilisateurRepository.save(utilisateur);
        return ResponseEntity.ok(updatedUser);
    }

}

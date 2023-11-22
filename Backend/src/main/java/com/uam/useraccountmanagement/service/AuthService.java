package com.uam.useraccountmanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.apache.commons.codec.digest.DigestUtils;
import com.uam.useraccountmanagement.model.Utilisateur;
import com.uam.useraccountmanagement.repository.UtilisateurRepository;

@Service
public class AuthService {
    private final UtilisateurRepository utilisateurRepository;

    @Autowired
    private UtilisateurRepository userRepository;

    public AuthService(UtilisateurRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    public boolean login(String email, String password) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email);
        return utilisateur != null && utilisateur.getPassword().equals(DigestUtils.sha256Hex(password));
    }

    public Utilisateur registerUser(@RequestBody Utilisateur user) {
        if (userRepository.findByEmail(user.getEmail()) != null) {
            // Gérez le cas où l'utilisateur existe déjà
            return null;
        }
        // Hachez le mot de passe avant de le stocker
        user.setPassword(DigestUtils.sha256Hex(user.getPassword()));

        try {
            return userRepository.save(user);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
package com.uam.useraccountmanagement.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uam.useraccountmanagement.model.Utilisateur;

@Repository
public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    long countByEmail(String email);

    Optional<Utilisateur> findByEmail(String email);

    Optional<Utilisateur> findByNom(String nom);

    Boolean existsByNom(String nom);

    Boolean existsByEmail(String email);
}

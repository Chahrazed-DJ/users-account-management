package com.uam.useraccountmanagement.model;

import com.uam.useraccountmanagement.model.enumeration.RoleUtilisateur;

import jakarta.persistence.*;


@Entity
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	@Enumerated(EnumType.STRING)
    private RoleUtilisateur nom;
    
    public Role() {
		
	}
    public Role(RoleUtilisateur nom) {
		super();
		this.nom = nom;
	}
    
    public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}

    public RoleUtilisateur getNom() {
		return nom;
	}
	public void setNom(RoleUtilisateur nom) {
		this.nom = nom;
	}
}
package com.uam.useraccountmanagement.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;


@Entity
@Table(name = "utilisateur")
public class Utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name = "nom")
    private String nom;
    @Column(name = "email")
    private String email;
    @Column(name = "password")
    private String password;
    
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "utilisateur_role",
            joinColumns = @JoinColumn(name = "utilisateur_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    
    @Column(name = "role")
    private Set<Role> roles = new HashSet<>(); //HashSet ne permet pas les doublons
     
    public Utilisateur() {
		
	}
    public Utilisateur(String nom, String email, String password, Set<Role> roles) {
		super();
		this.nom = nom;
        this.email=email;
        this.password=password;
        this.roles=roles;
	}

    public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
    public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
    public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
    public Set<Role> getRoles() {
        return roles;
    }
    public void setRoles(Set<Role> roles) {
        this.roles = roles;
    }
    public boolean isPresent() {
        return false;
    }
}

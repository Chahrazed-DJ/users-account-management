import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur';
import { UtilisateurServiceService } from '../utilisateur-service.service';
import { Status } from '../status';
import { Role } from '../role';

@Component({
  selector: 'app-page-ajouter-utilisateur',
  templateUrl: './page-ajouter-utilisateur.component.html',
  styleUrls: ['./page-ajouter-utilisateur.component.css']
})
export class PageAjouterUtilisateurComponent implements OnInit {
  utilisateur: Utilisateur = new Utilisateur();
  R1 = false; R2 = false; R3 = false; R4 = true; // pour checkbox
  isFormSubmitted = false;

  constructor(private router: Router, private utilisateurService: UtilisateurServiceService,) {
  }
  ngOnInit(): void {
  }


  navigateTo(chemin: string) {
    this.router.navigate([chemin]);
  }
  ajouterUtilisateur() {
    this.utilisateurService.addUser(this.utilisateur).subscribe(data => {
      this.resetForm();
      this.navigateTo('administrateur/rechercherutilisateur');
    },
      error => console.log(error));
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.validateForm() && this.isValidEmail()) {
      //ajouter les roles 
      const roles = [];
      role: Role;
      if (this.R1) {
        roles.push(new Role(Status.ROLE_ADMIN));
      }
      if (this.R2) {
        roles.push(new Role(Status.ROLE_USER));
      }
      if (this.R3) {
        roles.push(new Role(Status.ROLE_SUPERUSER));
      }
      roles.push(new Role(Status.ROLE_NEW));
      this.utilisateur.roles = roles;
      //ajouter l'utilisateur
      this.ajouterUtilisateur();
    }
  }

  validateForm(): boolean {
    return this.utilisateur.nom.trim() !== '' && this.utilisateur.email.trim() !== '' && this.utilisateur.password.trim() !== '';
  }
  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.utilisateur.email);
  }

  resetForm() {
    this.utilisateur = {
      nom: '',
      email: '',
      password: '',
      roles: []
    };
    this.isFormSubmitted = false;
  }
}

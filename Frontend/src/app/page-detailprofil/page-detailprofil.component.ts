import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur';
import { UtilisateurServiceService } from '../utilisateur-service.service';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-page-detailprofil',
  templateUrl: './page-detailprofil.component.html',
  styleUrls: ['./page-detailprofil.component.css']
})
export class PageDetailprofilComponent implements OnInit {
  id!: number;
  utilisateur: Utilisateur = new Utilisateur();
  isFormSubmitted = false;

  constructor(private router: Router, private utilisateurService: UtilisateurServiceService) { }
  ngOnInit(): void {
    this.utilisateur = this.utilisateurService.profilUtilisateur;
  }

  navigateTo(chemin: string) {
    this.router.navigate([chemin]);
  }
  validateForm(): boolean {
    return this.utilisateur.nom.trim() !== '' && this.utilisateur.email.trim() !== '' && this.utilisateur.password.trim() !== '';
  }
  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.utilisateur.email);
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.validateForm() && this.isValidEmail()) {
      //modifier l'utilisateur
      this.utilisateurService.updateUser(this.id, this.utilisateur).subscribe(data => {
        this.resetForm();
        this.navigateTo('administrateur/rechercherutilisateur');
      }
        , error => console.log(error));
    }
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

  deconnecter() {
    this.utilisateurService.logOut().subscribe(data => {
      this.utilisateurService.profilUtilisateur = new Utilisateur();
      this.utilisateurService.isAuthenticated = false;
      this.navigateTo(data.message);
    }
      , error => console.log(error));
  }


}

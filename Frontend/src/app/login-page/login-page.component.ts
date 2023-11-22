import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur';
import { UtilisateurServiceService } from '../utilisateur-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  id!: number;
  isFormSubmitted = false;
  utilisateur: Utilisateur = new Utilisateur();
  constructor(private router: Router, private utilisateurService: UtilisateurServiceService) {
  }
  navigateTo(chemin: string) {
    this.router.navigate([chemin]);
  }
  validateForm(): boolean {
    return this.utilisateur.email.trim() !== '' && this.utilisateur.password.trim() !== '';
  }
  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.utilisateur.email);
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.validateForm() && this.isValidEmail()) {
      //se connecter
      this.utilisateurService.logIn(this.utilisateur.email, this.utilisateur.password).subscribe(data => {
        this.utilisateurService.profilUtilisateur = data;
        this.utilisateurService.isAuthenticated = true;
        if (this.utilisateurService.profilUtilisateur.roles.some(role => role.nom === 'ROLE_ADMIN')) {
          this.navigateTo('administrateur/acceuiladministrateur')
        }
        else {
          this.navigateTo('utilisateur/acceuilutilisateur');
        }
      }
        , error => console.log(error));
    }
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur';
import { UtilisateurServiceService } from '../utilisateur-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  utilisateur: Utilisateur = new Utilisateur();
  isFormSubmitted = false;
  constructor(private router: Router, private utilisateurService: UtilisateurServiceService) {
  }
  navigateTo(chemin: string) {
    this.router.navigate([chemin]);
  }
  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.utilisateur.email);
  }
  validateForm(): boolean {
    return this.utilisateur.nom.trim() !== '' && this.utilisateur.email.trim() !== '' && this.utilisateur.password.trim() !== '';
  }
  onSubmit() {
    this.isFormSubmitted = true;
    if (this.validateForm() && this.isValidEmail()) {
      //ajouter l'utilisateur
      this.utilisateurService.addUser(this.utilisateur).subscribe(data => {
        this.navigateTo('connexion');
      },
        error => console.log(error));
    }

  }

}

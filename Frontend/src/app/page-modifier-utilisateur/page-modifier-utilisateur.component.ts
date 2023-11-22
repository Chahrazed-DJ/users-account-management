import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Utilisateur } from '../utilisateur';
import { UtilisateurServiceService } from '../utilisateur-service.service';
import { Role } from '../role';
import { Status } from '../status';

@Component({
  selector: 'app-page-modifier-utilisateur',
  templateUrl: './page-modifier-utilisateur.component.html',
  styleUrls: ['./page-modifier-utilisateur.component.css']
})
export class PageModifierUtilisateurComponent implements OnInit {
  id!: number;
  utilisateur: Utilisateur = new Utilisateur();
  R1 = false; R2 = false; R3 = false; R4 = true; // pour checkbox
  isFormSubmitted = false;

  constructor(private router: Router, private utilisateurService: UtilisateurServiceService
    , private route: ActivatedRoute,) {
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.utilisateurService.getUserById(this.id).subscribe(data => {
      this.utilisateur = data;
      this.utilisateur.roles.forEach(role => {
        if (role.nom == Status.ROLE_ADMIN) this.R1 = true;
        if (role.nom == Status.ROLE_USER) this.R2 = true;
        if (role.nom == Status.ROLE_SUPERUSER) this.R3 = true;
      });
    }, error => console.log(error));
  }
  navigateTo(chemin: string) {
    this.router.navigate([chemin]);
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
      //modifier l'utilisateur
      this.utilisateurService.updateUser(this.id, this.utilisateur).subscribe(data => {
        this.resetForm();
        this.navigateTo('administrateur/rechercherutilisateur');
      }
        , error => console.log(error));
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

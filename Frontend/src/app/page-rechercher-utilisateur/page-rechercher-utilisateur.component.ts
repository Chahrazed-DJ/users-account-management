import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from '../utilisateur';
import { UtilisateurServiceService } from '../utilisateur-service.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-page-rechercher-utilisateur',
  templateUrl: './page-rechercher-utilisateur.component.html',
  styleUrls: ['./page-rechercher-utilisateur.component.css']
})
export class PageRechercherUtilisateurComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  searchEmail: string = '';
  filteredUsers: Utilisateur[] = [];


  constructor(private router: Router, private utilisateurService: UtilisateurServiceService) { }
  ngOnInit(): void {
    this.getAllUsers();
  }

  navigateTo(chemin: string, id: number) {
    this.router.navigate([chemin, id]);
  }
  private getAllUsers() {
    this.utilisateurService.getUsers().subscribe(data => {
      this.utilisateurs = data;
      this.filteredUsers = data;
    });
  }

  searchUsers(): void {
    this.filteredUsers = this.utilisateurs.filter(
      (user) => user.email.toLowerCase().includes(this.searchEmail.toLowerCase())
    );
  }
}

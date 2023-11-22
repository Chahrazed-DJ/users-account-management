import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-utilisateur',
  templateUrl: './page-utilisateur.component.html',
  styleUrls: ['./page-utilisateur.component.css']
})
export class PageUtilisateurComponent {
  constructor(private router: Router) {
  }
  navigateTo(chemin: string) {
    this.router.navigate([chemin]);
  }
  activeItemIndex: number | null = null;

  navItems = [
    { label: 'Accueil', link: 'acceuilutilisateur' },
  ];

  setActiveItem(index: number): void {
    this.activeItemIndex = index;
  }
}

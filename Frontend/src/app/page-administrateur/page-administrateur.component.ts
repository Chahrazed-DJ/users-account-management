import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-page-administrateur',
  templateUrl: './page-administrateur.component.html',
  styleUrls: ['./page-administrateur.component.css']
})
export class PageAdministrateurComponent {
  constructor(private translateService: TranslateService) {
  }
  activeItemIndex: number | null = null;

  navItems = [
    { label: this.translateService.instant('acceuil'), link: 'acceuiladministrateur' },
    { label: this.translateService.instant('rechercher'), link: 'rechercherutilisateur' },
    { label: this.translateService.instant('ajouter'), link: 'ajouterutilisateur' },

  ];

  setActiveItem(index: number): void {
    this.activeItemIndex = index;
  }
}

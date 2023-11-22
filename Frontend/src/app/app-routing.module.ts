import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageConsultationComponent } from './page-consultation/page-consultation.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PageUtilisateurComponent } from './page-utilisateur/page-utilisateur.component';
import { PageDetailprofilComponent } from './page-detailprofil/page-detailprofil.component';
import { PageAcceuilUtilisateurComponent } from './page-acceuil-utilisateur/page-acceuil-utilisateur.component';
import { PageAdministrateurComponent } from './page-administrateur/page-administrateur.component';
import { PageAcceuilAdministrateurComponent } from './page-acceuil-administrateur/page-acceuil-administrateur.component';
import { PageRechercherUtilisateurComponent } from './page-rechercher-utilisateur/page-rechercher-utilisateur.component';
import { PageModifierUtilisateurComponent } from './page-modifier-utilisateur/page-modifier-utilisateur.component';
import { PageAjouterUtilisateurComponent } from './page-ajouter-utilisateur/page-ajouter-utilisateur.component';
import { UtilisateurServiceService } from './utilisateur-service.service';

const routes: Routes = [
  { path: '', component: PageConsultationComponent },
  { path: 'connexion', component: LoginPageComponent },
  { path: 'enregistrer', component: RegisterPageComponent },
  {
    path: 'utilisateur', component: PageUtilisateurComponent, canActivate: [UtilisateurServiceService],
    children: [
      { path: 'acceuilutilisateur', component: PageAcceuilUtilisateurComponent },
      { path: 'detailsprofil', component: PageDetailprofilComponent },
    ]
  },
  {
    path: 'administrateur', component: PageAdministrateurComponent, canActivate: [UtilisateurServiceService],
    children: [
      { path: 'acceuiladministrateur', component: PageAcceuilAdministrateurComponent },
      { path: 'rechercherutilisateur', component: PageRechercherUtilisateurComponent },
      { path: 'detailsprofil', component: PageDetailprofilComponent },
      { path: 'modifierutilisateur/:id', component: PageModifierUtilisateurComponent },
      { path: 'ajouterutilisateur', component: PageAjouterUtilisateurComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

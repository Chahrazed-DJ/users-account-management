import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginPageComponent } from './login-page/login-page.component';
import { PageConsultationComponent } from './page-consultation/page-consultation.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PageUtilisateurComponent } from './page-utilisateur/page-utilisateur.component';
import { PageAdministrateurComponent } from './page-administrateur/page-administrateur.component';
import { PageDetailprofilComponent } from './page-detailprofil/page-detailprofil.component';
import { PageAcceuilUtilisateurComponent } from './page-acceuil-utilisateur/page-acceuil-utilisateur.component';
import { PageAcceuilAdministrateurComponent } from './page-acceuil-administrateur/page-acceuil-administrateur.component';
import { PageRechercherUtilisateurComponent } from './page-rechercher-utilisateur/page-rechercher-utilisateur.component';
import { PageModifierUtilisateurComponent } from './page-modifier-utilisateur/page-modifier-utilisateur.component';
import { PageAjouterUtilisateurComponent } from './page-ajouter-utilisateur/page-ajouter-utilisateur.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PageConsultationComponent,
    RegisterPageComponent,
    PageUtilisateurComponent,
    PageAdministrateurComponent,
    PageDetailprofilComponent,
    PageAcceuilUtilisateurComponent,
    PageAcceuilAdministrateurComponent,
    PageRechercherUtilisateurComponent,
    PageModifierUtilisateurComponent,
    PageAjouterUtilisateurComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([], { onSameUrlNavigation: 'reload' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
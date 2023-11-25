import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Utilisateur } from './utilisateur';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService implements CanActivate {
  profilUtilisateur: Utilisateur = new Utilisateur();
  isAuthenticated = false;
  private currentLang: string;

  constructor(private httpClient: HttpClient,
    private router: Router, public translate: TranslateService) {
    this.translate.addLangs(['Français', 'English', 'العربية']);
    this.currentLang = 'Français';
    this.translate.setDefaultLang(this.currentLang);
  }
  switchLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(this.currentLang);
  }
  getCurrentLang(): string {
    return this.currentLang;
  }
  getLangs(): string[] {
    return this.translate.getLangs();
  }
  canActivate(): boolean {
    if (this.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }


  getUsers(): Observable<Utilisateur[]> {
    return this.httpClient.get<Utilisateur[]>(`${environment.URL}`);
  }

  addUser(uti: Utilisateur): Observable<Object> {
    return this.httpClient.post(`${environment.URL}`, uti);
  }

  getUserById(id: number): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(`${environment.URL}/${id}`);
  }

  updateUser(id: number, utilisateur: Utilisateur): Observable<Object> {
    return this.httpClient.put(`${environment.URL}/${id}`, utilisateur);
  }


  logIn(user: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(`${environment.loginURL}`, user);
  }


  signUp(user: Utilisateur): Observable<Utilisateur> {
    return this.httpClient.post<Utilisateur>(`${environment.registerURL}`, user);
  }


  logOut(): Observable<any> {
    return this.httpClient.get<any>(`${environment.logoutURL}`);
  }


}

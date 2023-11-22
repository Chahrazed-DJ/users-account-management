import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Utilisateur } from './utilisateur';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurServiceService implements CanActivate {
  profilUtilisateur: Utilisateur = new Utilisateur();
  isAuthenticated = false;
  private URL = "http://localhost:8080/api/admin/utilisateurs";
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
    return this.httpClient.get<Utilisateur[]>(`${this.URL}`);
  }

  addUser(uti: Utilisateur): Observable<Object> {
    return this.httpClient.post(`${this.URL}`, uti);
  }

  getUserById(id: number): Observable<Utilisateur> {
    return this.httpClient.get<Utilisateur>(`${this.URL}/${id}`);
  }

  updateUser(id: number, utilisateur: Utilisateur): Observable<Object> {
    return this.httpClient.put(`${this.URL}/${id}`, utilisateur);
  }

  private cnxURL = "http://localhost:8080/api/auth/login";
  logIn(email: string, password: string): Observable<Utilisateur> {
    const privateData = {
      email: email,
      password: password
    }
    return this.httpClient.post<Utilisateur>(`${this.cnxURL}`, null, { params: privateData });
  }
  private dcnxURL = "http://localhost:8080/api/auth/logout";
  logOut(): Observable<any> {
    return this.httpClient.get<any>(`${this.dcnxURL}`);
  }


}

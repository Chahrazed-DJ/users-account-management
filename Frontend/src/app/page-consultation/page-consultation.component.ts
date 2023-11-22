import { Component, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilisateurServiceService } from '../utilisateur-service.service';
@Component({
  selector: 'app-page-consultation',
  templateUrl: './page-consultation.component.html',
  styleUrls: ['./page-consultation.component.css']
})
export class PageConsultationComponent {
  userEmail: string = '';
  @ViewChild('emailModal') emailModal: any;
  supportedLanguages: string[] = [];
  constructor(private modalService: NgbModal, public translationService: UtilisateurServiceService) {
    this.supportedLanguages = translationService.getLangs();
  }
  switchLang(lang: string) {
    this.translationService.switchLang(lang);
  }
  get currentLang(): string {
    return this.translationService.getCurrentLang();
  }


  openEmailModal() {
    const modalRef = this.modalService.open(this.emailModal);
  }
  confirmEmail() {
    if (this.isValidEmail()) {
      console.log('Email confirmé :', this.userEmail);
      this.modalService.dismissAll();
    }
    else { console.log('Veuillez saisir un email valide'); }
  }
  isValidEmail(): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.userEmail);
  }
}

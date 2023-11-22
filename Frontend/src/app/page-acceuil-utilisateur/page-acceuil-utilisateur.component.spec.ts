import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcceuilUtilisateurComponent } from './page-acceuil-utilisateur.component';

describe('PageAcceuilUtilisateurComponent', () => {
  let component: PageAcceuilUtilisateurComponent;
  let fixture: ComponentFixture<PageAcceuilUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAcceuilUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAcceuilUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRechercherUtilisateurComponent } from './page-rechercher-utilisateur.component';

describe('PageRechercherUtilisateurComponent', () => {
  let component: PageRechercherUtilisateurComponent;
  let fixture: ComponentFixture<PageRechercherUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageRechercherUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRechercherUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

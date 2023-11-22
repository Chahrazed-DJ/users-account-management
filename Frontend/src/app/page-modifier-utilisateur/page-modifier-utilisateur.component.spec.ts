import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageModifierUtilisateurComponent } from './page-modifier-utilisateur.component';

describe('PageModifierUtilisateurComponent', () => {
  let component: PageModifierUtilisateurComponent;
  let fixture: ComponentFixture<PageModifierUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageModifierUtilisateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageModifierUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

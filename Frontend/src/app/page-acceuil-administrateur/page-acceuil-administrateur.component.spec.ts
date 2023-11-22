import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAcceuilAdministrateurComponent } from './page-acceuil-administrateur.component';

describe('PageAcceuilAdministrateurComponent', () => {
  let component: PageAcceuilAdministrateurComponent;
  let fixture: ComponentFixture<PageAcceuilAdministrateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageAcceuilAdministrateurComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAcceuilAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

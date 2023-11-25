import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAdministrateurComponent } from './page-administrateur.component';

describe('PageAdministrateurComponent', () => {
  let component: PageAdministrateurComponent;
  let fixture: ComponentFixture<PageAdministrateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageAdministrateurComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageAdministrateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

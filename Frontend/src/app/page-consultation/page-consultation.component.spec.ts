import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageConsultationComponent } from './page-consultation.component';

describe('PageConsultationComponent', () => {
  let component: PageConsultationComponent;
  let fixture: ComponentFixture<PageConsultationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageConsultationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

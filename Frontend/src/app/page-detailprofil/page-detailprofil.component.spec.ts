import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageDetailprofilComponent } from './page-detailprofil.component';

describe('PageDetailprofilComponent', () => {
  let component: PageDetailprofilComponent;
  let fixture: ComponentFixture<PageDetailprofilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageDetailprofilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageDetailprofilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

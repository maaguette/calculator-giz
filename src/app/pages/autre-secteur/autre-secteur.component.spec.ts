import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutreSecteurComponent } from './autre-secteur.component';

describe('AutreSecteurComponent', () => {
  let component: AutreSecteurComponent;
  let fixture: ComponentFixture<AutreSecteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutreSecteurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutreSecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

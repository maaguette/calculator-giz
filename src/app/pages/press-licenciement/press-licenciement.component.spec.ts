import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressLicenciementComponent } from './press-licenciement.component';

describe('PressLicenciementComponent', () => {
  let component: PressLicenciementComponent;
  let fixture: ComponentFixture<PressLicenciementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressLicenciementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressLicenciementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

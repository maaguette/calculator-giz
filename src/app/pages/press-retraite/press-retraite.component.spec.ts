import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PressRetraiteComponent } from './press-retraite.component';

describe('PressRetraiteComponent', () => {
  let component: PressRetraiteComponent;
  let fixture: ComponentFixture<PressRetraiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PressRetraiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PressRetraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeureSupComponent } from './heure-sup.component';

describe('HeureSupComponent', () => {
  let component: HeureSupComponent;
  let fixture: ComponentFixture<HeureSupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeureSupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeureSupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

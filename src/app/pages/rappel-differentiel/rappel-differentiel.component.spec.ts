import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RappelDifferentielComponent } from './rappel-differentiel.component';

describe('RappelDifferentielComponent', () => {
  let component: RappelDifferentielComponent;
  let fixture: ComponentFixture<RappelDifferentielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RappelDifferentielComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RappelDifferentielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

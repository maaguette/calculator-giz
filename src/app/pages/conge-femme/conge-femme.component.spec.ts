import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeFemmeComponent } from './conge-femme.component';

describe('CongeFemmeComponent', () => {
  let component: CongeFemmeComponent;
  let fixture: ComponentFixture<CongeFemmeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CongeFemmeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CongeFemmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectivityRetraiteComponent } from './collectivity-retraite.component';

describe('CollectivityRetraiteComponent', () => {
  let component: CollectivityRetraiteComponent;
  let fixture: ComponentFixture<CollectivityRetraiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectivityRetraiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectivityRetraiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

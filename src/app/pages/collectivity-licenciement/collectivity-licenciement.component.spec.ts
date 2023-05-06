import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectivityLicenciementComponent } from './collectivity-licenciement.component';

describe('CollectivityLicenciementComponent', () => {
  let component: CollectivityLicenciementComponent;
  let fixture: ComponentFixture<CollectivityLicenciementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectivityLicenciementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectivityLicenciementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

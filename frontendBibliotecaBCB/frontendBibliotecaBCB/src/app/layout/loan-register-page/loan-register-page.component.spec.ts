import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRegisterPageComponent } from './loan-register-page.component';

describe('LoanRegisterPageComponent', () => {
  let component: LoanRegisterPageComponent;
  let fixture: ComponentFixture<LoanRegisterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanRegisterPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanRegisterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

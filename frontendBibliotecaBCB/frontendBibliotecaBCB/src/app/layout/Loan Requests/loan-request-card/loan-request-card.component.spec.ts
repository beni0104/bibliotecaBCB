import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestCardComponent } from './loan-request-card.component';

describe('LoanRequestCardComponent', () => {
  let component: LoanRequestCardComponent;
  let fixture: ComponentFixture<LoanRequestCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanRequestCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanRequestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanRequestsPageComponent } from './manage-loan-requests-page.component';

describe('LoanRequestsPageComponent', () => {
  let component: LoanRequestsPageComponent;
  let fixture: ComponentFixture<LoanRequestsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoanRequestsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoanRequestsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

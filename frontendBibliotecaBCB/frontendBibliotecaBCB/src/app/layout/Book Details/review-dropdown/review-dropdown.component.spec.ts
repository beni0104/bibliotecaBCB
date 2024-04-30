import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewDropdownComponent } from './review-dropdown.component';

describe('ReviewDropdownComponent', () => {
  let component: ReviewDropdownComponent;
  let fixture: ComponentFixture<ReviewDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReviewDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReviewDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

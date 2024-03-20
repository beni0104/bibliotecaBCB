import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedBookCardComponent } from './related-book-card.component';

describe('RelatedBookCardComponent', () => {
  let component: RelatedBookCardComponent;
  let fixture: ComponentFixture<RelatedBookCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RelatedBookCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelatedBookCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

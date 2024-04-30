import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBooksPageComponent } from './add-books-page.component';

describe('AddBooksPageComponent', () => {
  let component: AddBooksPageComponent;
  let fixture: ComponentFixture<AddBooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddBooksPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

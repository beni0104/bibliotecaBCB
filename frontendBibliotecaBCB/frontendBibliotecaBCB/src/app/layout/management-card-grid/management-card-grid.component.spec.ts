import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementCardGridComponent } from './management-card-grid.component';

describe('ManagementCardGridComponent', () => {
  let component: ManagementCardGridComponent;
  let fixture: ComponentFixture<ManagementCardGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManagementCardGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementCardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

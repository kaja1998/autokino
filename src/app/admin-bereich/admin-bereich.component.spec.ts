import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBereichComponent } from './admin-bereich.component';

describe('AdminBereichComponent', () => {
  let component: AdminBereichComponent;
  let fixture: ComponentFixture<AdminBereichComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBereichComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminBereichComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

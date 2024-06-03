import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenkontoComponent } from './kundenkonto.component';

describe('KundenkontoComponent', () => {
  let component: KundenkontoComponent;
  let fixture: ComponentFixture<KundenkontoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KundenkontoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundenkontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

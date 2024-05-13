import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundenkontoBearbeitenComponent } from './kundenkonto-bearbeiten.component';

describe('KundenkontoBearbeitenComponent', () => {
  let component: KundenkontoBearbeitenComponent;
  let fixture: ComponentFixture<KundenkontoBearbeitenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KundenkontoBearbeitenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KundenkontoBearbeitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

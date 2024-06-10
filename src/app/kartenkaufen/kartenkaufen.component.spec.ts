import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KartenkaufenComponent } from './kartenkaufen.component';

describe('KartenkaufenComponent', () => {
  let component: KartenkaufenComponent;
  let fixture: ComponentFixture<KartenkaufenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KartenkaufenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KartenkaufenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

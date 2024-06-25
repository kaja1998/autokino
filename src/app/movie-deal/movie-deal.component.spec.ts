import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDealComponent } from './movie-deal.component';

describe('MovieDealComponent', () => {
  let component: MovieDealComponent;
  let fixture: ComponentFixture<MovieDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDealComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

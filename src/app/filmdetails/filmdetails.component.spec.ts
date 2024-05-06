import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmdetailsComponent } from './filmdetails.component';

describe('FilmdetailsComponent', () => {
  let component: FilmdetailsComponent;
  let fixture: ComponentFixture<FilmdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilmdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

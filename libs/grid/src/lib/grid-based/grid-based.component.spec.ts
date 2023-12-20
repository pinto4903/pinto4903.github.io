import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GridBasedComponent } from './grid-based.component';

describe('GridBasedComponent', () => {
  let component: GridBasedComponent;
  let fixture: ComponentFixture<GridBasedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridBasedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GridBasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

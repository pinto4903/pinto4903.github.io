import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionsComponent } from './progressions.component';

describe('ProgressionsComponent', () => {
  let component: ProgressionsComponent;
  let fixture: ComponentFixture<ProgressionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

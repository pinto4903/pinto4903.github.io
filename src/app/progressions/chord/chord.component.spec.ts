import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordComponent } from './chord.component';

describe('ChordComponent', () => {
  let component: ChordComponent;
  let fixture: ComponentFixture<ChordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

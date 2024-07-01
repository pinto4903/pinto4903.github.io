import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChordSelectorComponent } from './chord-selector.component';

describe('ChordSelectorComponent', () => {
  let component: ChordSelectorComponent;
  let fixture: ComponentFixture<ChordSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChordSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChordSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

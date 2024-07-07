import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullSelectorComponent } from './full-selector.component';

describe('FullSelectorComponent', () => {
  let component: FullSelectorComponent;
  let fixture: ComponentFixture<FullSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FullSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DotSelectorComponent } from './dot-selector.component';

describe('DotSelectorComponent', () => {
  let component: DotSelectorComponent;
  let fixture: ComponentFixture<DotSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DotSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DotSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

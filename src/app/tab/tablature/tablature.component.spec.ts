import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablatureComponent } from './tablature.component';

describe('TablatureComponent', () => {
  let component: TablatureComponent;
  let fixture: ComponentFixture<TablatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

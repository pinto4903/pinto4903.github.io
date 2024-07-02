import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dot-selector',
  standalone: true,
  imports: [],
  templateUrl: './dot-selector.component.html',
  styleUrl: './dot-selector.component.css',
})
export class DotSelectorComponent implements OnChanges {
  @Input({ required: true }) dotCount!: number;
  @Output() dotChanged = new EventEmitter<number>();

  currentActive = 0;
  dots: number[] = [];

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.dotCount);
    this.updateDotArray();
  }

  private updateDotArray() {
    this.dots = Array.from({ length: this.dotCount }, (_, i) => i);
  }

  moveLeft() {
    this.currentActive = (this.currentActive - 1 + this.dotCount) % this.dotCount;
    this.dotChanged.emit(this.currentActive);
  }

  moveRight() {
    this.currentActive = (this.currentActive + 1) % this.dotCount;
    this.dotChanged.emit(this.currentActive);
  }
}

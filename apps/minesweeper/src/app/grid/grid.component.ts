import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { Cell } from '../cell/cell';

@Component({
  selector: 'mines-grid',
  standalone: true,
  imports: [CommonModule, MatGridListModule],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.css',
})
export class GridComponent {
  tiles : Cell[] = [{row: 0, col: 0}, {row: 0, col: 1}];
}

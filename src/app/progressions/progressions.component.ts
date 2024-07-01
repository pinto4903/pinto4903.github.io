import { Component, Input } from '@angular/core';
import { ProgressionService } from './progression.service';
import { FormsModule } from '@angular/forms';
import { ChordComponent } from './chord/chord.component';

@Component({
  selector: 'app-progressions',
  standalone: true,
  templateUrl: './progressions.component.html',
  styleUrl: './progressions.component.css',
  imports: [FormsModule, ChordComponent],
})
export class ProgressionsComponent {
  progression: string[] = [];
  key = '';

  constructor(private progressionService: ProgressionService) {}

  updateProgression() {
    this.progression = this.progressionService.getMajorProgression(this.key);
  }
}

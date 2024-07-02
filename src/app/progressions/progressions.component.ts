import { Component } from '@angular/core';
import { ProgressionService } from './progression.service';
import { FormsModule } from '@angular/forms';
import { ChordSelectorComponent } from './chord-selector/chord-selector.component';

@Component({
  selector: 'app-progressions',
  standalone: true,
  templateUrl: './progressions.component.html',
  styleUrl: './progressions.component.css',
  imports: [FormsModule, ChordSelectorComponent],
})
export class ProgressionsComponent {
  progression: string[] = [];
  key = 'C';

  constructor(private progressionService: ProgressionService) {}

  updateProgression() {
    this.progression = this.progressionService.getMajorProgression(this.key);
  }
}

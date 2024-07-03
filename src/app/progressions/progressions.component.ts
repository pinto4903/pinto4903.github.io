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
  // TODO this whole component sucks lol, if key doesnt exist the site dies
  progression: string[] = [];
  key = 'C';

  constructor(private progressionService: ProgressionService) {}

  updateProgression() {
    if (this.progressionService.keyExists(this.key)) {
      if (this.key.charAt(0) == this.key.charAt(0).toUpperCase())
        this.progression = this.progressionService.getMajorProgression(this.key);
      else this.progression = this.progressionService.getMinorProgression(this.key);
    } else {
      alert('Unknown or theoretical key. Possible values: ' + this.progressionService.validKeys());
    }
  }
}

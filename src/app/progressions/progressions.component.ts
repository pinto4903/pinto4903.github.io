import { Component } from '@angular/core';
import { ProgressionService } from './progression.service';
import { FormsModule } from '@angular/forms';
import { FullSelectorComponent } from './full-selector/full-selector.component';

@Component({
  selector: 'app-progressions',
  standalone: true,
  templateUrl: './progressions.component.html',
  styleUrl: './progressions.component.css',
  imports: [FormsModule, FullSelectorComponent],
})
export class ProgressionsComponent {
  progression: string[] = [];
  key = 'C';
  major = true;

  constructor(private progressionService: ProgressionService) {}

  updateProgression() {
    if (this.progressionService.keyExists(this.key)) {
      if (this.isKeyMajor()) {
        this.progression = this.progressionService.getMajorProgression(this.key);
        this.major = true;
      } else {
        this.progression = this.progressionService.getMinorProgression(this.key);
        this.major = false;
      }
    } else {
      alert('Unknown or theoretical key. Possible values: ' + this.progressionService.validKeys());
    }
  }

  isKeyMajor() {
    return this.key.charAt(0) == this.key.charAt(0).toUpperCase();
  }
}

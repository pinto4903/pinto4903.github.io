import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ChordSelectorComponent } from '../chord-selector/chord-selector.component';
import { ProgressionService } from '../progression.service';

@Component({
  selector: 'app-full-selector',
  standalone: true,
  templateUrl: './full-selector.component.html',
  styleUrl: './full-selector.component.css',
  imports: [ChordSelectorComponent],
})
export class FullSelectorComponent implements OnInit, OnChanges {
  @Input({ required: true }) chord!: string;
  @Input({ required: true }) degree!: number;
  @Input() displayAlternate = false;

  currChord!: string;
  seventhChecked = false;
  alternateChecked = false;

  constructor(private progressionService: ProgressionService) {}

  // TODO 7th AND alternate is missing, one at a time works
  ngOnInit() {
    this.currChord = this.chord;
  }

  ngOnChanges() {
    this.currChord = this.chord;
    this.seventhChecked = false;
    this.alternateChecked = false;
  }

  seventh() {
    if (!this.seventhChecked) {
      this.currChord = this.progressionService.getSeventh(
        this.chord,
        this.degree,
        this.displayAlternate
      );
      this.seventhChecked = true;
    } else {
      this.currChord = this.chord;
      this.seventhChecked = false;
    }
  }

  alternate() {
    if (!this.alternateChecked) {
      this.currChord = this.progressionService.getAlt(this.chord, this.degree);
      this.alternateChecked = true;
    } else {
      this.currChord = this.chord;
      this.alternateChecked = false;
    }
  }
}

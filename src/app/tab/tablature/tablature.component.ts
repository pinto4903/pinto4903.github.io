import { Component, HostListener } from '@angular/core';
import { FretService, GuitarFret } from '../fret.service';

@Component({
  selector: 'app-tablature',
  standalone: true,
  imports: [],
  templateUrl: './tablature.component.html',
  styleUrl: './tablature.component.css',
})
export class TablatureComponent {
  view: string[] = ['-', '-', '-', '-', '-', '-'];
  model: tabColumn[] = [];

  constructor(private fretService: FretService) {
    this.fretService.note$.subscribe((note) => {
      this.addNote(note);
    });
    this.fretService.chord$.subscribe((chord) => {
      this.addChord(chord);
    });
  }

  @HostListener('window:keydown.space', ['$event'])
  handleSpace(event: KeyboardEvent) {
    alert('def'); // TODO
  }

  @HostListener('window:keydown.backspace', ['$event'])
  handleBackspace(event: KeyboardEvent) {
    alert('abc'); // TODO
  }

  addNote(note: GuitarFret) {
    this.addChord([note]);
  }

  addChord(chord: GuitarFret[]) {
    // TODO handle line wrapping
    let strings = [0, 1, 2, 3, 4, 5];
    let ddFret = chord.some((e) => e.fret >= 10);
    for (let i in chord) {
      let str = chord[i].str;
      let fret = chord[i].fret;
      if (ddFret) {
        this.view[str - 1] += (fret < 10 ? '-' : '') + fret + '-';
      } else {
        this.view[str - 1] += fret + '-';
      }
      strings.splice(strings.indexOf(str - 1), 1);
    }
    for (let i in strings) {
      this.view[strings[i]] += ddFret ? '---' : '--';
    }
    this.model.push({ pause: false, notes: chord });
  }
}

export interface tabColumn {
  pause: boolean;
  notes: GuitarFret[];
}

import { Component, HostListener, OnDestroy } from '@angular/core';
import { FretService, GuitarFret } from '../fret.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tablature',
  standalone: true,
  imports: [],
  templateUrl: './tablature.component.html',
  styleUrl: './tablature.component.css',
})
export class TablatureComponent implements OnDestroy {
  view: string[][] = [[''], [''], [''], [''], [''], ['']];
  model: tabColumn[] = [];
  noteSubscription: Subscription;
  chordSubscription: Subscription;
  maxWidth = 150;

  constructor(private fretService: FretService) {
    this.noteSubscription = this.fretService.note$.subscribe((note) => {
      this.addNote(note);
    });
    this.chordSubscription = this.fretService.chord$.subscribe((chord) => {
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

  ngOnDestroy(): void {
    this.noteSubscription.unsubscribe();
    this.chordSubscription.unsubscribe();
  }

  addNote(note: GuitarFret) {
    this.addChord([note]);
  }

  addChord(chord: GuitarFret[]) {
    const strings = [0, 1, 2, 3, 4, 5];
    const ddFret = chord.some((e) => e.fret >= 10);
    const newColumn = ddFret ? '---' : '--';

    if (this.view[0][this.view[0].length - 1].length + newColumn.length > this.maxWidth) {
      for (let i = 0; i < 6; i++) {
        this.view[i].push('');
      }
    }

    for (const i in chord) {
      const str = chord[i].str;
      const fret = chord[i].fret;
      if (ddFret) {
        this.view[str - 1][this.view[str - 1].length - 1] += (fret < 10 ? '-' : '') + fret + '-';
      } else {
        this.view[str - 1][this.view[str - 1].length - 1] += fret + '-';
      }
      strings.splice(strings.indexOf(str - 1), 1);
    }

    for (const i in strings) {
      this.view[strings[i]][this.view[strings[i]].length - 1] += newColumn;
    }

    this.model.push({ pause: false, notes: chord });
  }

  renderView(): string[][] {
    return this.view.map((line) => line.map((paragraph) => paragraph.padEnd(this.maxWidth, '-')));
  }
}

export interface tabColumn {
  pause: boolean;
  notes: GuitarFret[];
}

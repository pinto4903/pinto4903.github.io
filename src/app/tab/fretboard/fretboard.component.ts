import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { NoteService } from '../note.service';
import { FretService, GuitarFret } from '../fret.service';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.css',
})
export class FretboardComponent {
  @Output() fretClickEvent = new EventEmitter<[number, number]>();
  shiftPressed = false;
  selectedElements: HTMLElement[] = [];

  constructor(private noteService: NoteService, private fretService: FretService) {}

  @HostListener('window:keydown.shift', ['$event'])
  handleShiftDown(event: KeyboardEvent) {
    this.shiftPressed = true;
  }

  @HostListener('window:keyup.shift', ['$event'])
  handleShiftUp(event: KeyboardEvent) {
    this.shiftPressed = false;
    for (const i in this.selectedElements) {
      this.selectedElements[i].style.fill = '';
    }
    const notes: string[] = this.selectedElements.map((elem) => {
      const numbers = FretboardComponent.idToFret(elem.id);
      return FretboardComponent.fretToNote(numbers[0], numbers[1]);
    });
    this.noteService.setChord(notes);
    const frets: GuitarFret[] = this.selectedElements.map((elem) => {
      const numbers = FretboardComponent.idToFret(elem.id);
      return { str: numbers[0], fret: numbers[1] };
    });
    this.fretService.setChord(frets);
    this.selectedElements = [];
    // TODO add a chord indicator light :)
    // TODO study css it sucks
  }

  onClick(e: Event) {
    if (this.shiftPressed) {
      const htmele = e.target as HTMLElement;
      if (this.selectedElements.includes(htmele)) {
        const i = this.selectedElements.indexOf(htmele);
        this.selectedElements.splice(i, 1);
        htmele.style.fill = '';
      } else {
        const id = htmele.id;
        const str: number = FretboardComponent.idToFret(id)[0];
        const i = this.selectedElements.findIndex(
          (elem) => FretboardComponent.idToFret(elem.id)[0] == str
        );
        if (i > -1) {
          this.selectedElements[i].style.fill = '';
          this.selectedElements.splice(i, 1);
        }
        htmele.style.fill = 'color-mix(in srgb, var(--c2) 70%, transparent)';
        this.selectedElements.push(htmele);
      }
    } else {
      const targetElement = e.target as Element;
      const id = targetElement.id;
      const numbers: number[] = FretboardComponent.idToFret(id);
      this.noteService.setNote(FretboardComponent.fretToNote(numbers[0], numbers[1]));
      this.fretService.setNote({ str: numbers[0], fret: numbers[1] });
    }
  }

  static idToFret(id: string) {
    const regex = /\d+/g;
    const matches: string[] = id.match(regex)!;
    return matches.map((match) => parseInt(match, 10));
  }

  static fretToNote(str: number, fret: number): string {
    const key = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    const num = (6 - str) * 5 + fret - (str < 3 ? 1 : 0);
    const note = `${key[(num + 7) % 12]}${Math.ceil(2 + Math.max(num - 7, 0) / 12)}`;
    console.log(note);
    return note;
  }
}

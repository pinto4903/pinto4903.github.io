import { Component, EventEmitter, Output } from '@angular/core';
import * as Tone from 'tone';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.css',
})
export class FretboardComponent {
  @Output() fretClickEvent = new EventEmitter<[number, number]>();
  sampler = new Tone.Sampler({
    urls: {
      E2: 'low_e.mp3',
      A2: 'A.mp3',
      D3: 'D.mp3',
      G3: 'G.mp3',
      B3: 'B.mp3',
      E4: 'high_e.mp3',
    },
    baseUrl: 'assets/sounds/',
  }).toDestination();

  onClick(e: Event) {
    console.log(e);
    const targetElement = e.target as Element;
    const id = targetElement.id;
    let regex: RegExp = /\d+/g;
    let matches: string[] = id.match(regex)!;
    let numbers: number[] = matches.map((match) => parseInt(match, 10));
    this.fretClickEvent.emit([numbers[0], numbers[1]]);

    if ((e as KeyboardEvent).ctrlKey) {
      this.sampler.triggerAttackRelease(this.fretToNote(numbers[0], numbers[1]), '2n');
    }
  }

  fretToNote(str: number, fret: number): string {
    const key = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

    const num = (6 - str) * 5 + fret - (str < 3 ? 1 : 0);
    console.log(num);
    const note = `${key[(num + 7) % 12]}${Math.ceil(2 + Math.max(num - 7, 0) / 12)}`;
    console.log(note);
    return note;
  }
}

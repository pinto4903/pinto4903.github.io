import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-fretboard',
  standalone: true,
  imports: [],
  templateUrl: './fretboard.component.html',
  styleUrl: './fretboard.component.css',
})
export class FretboardComponent {
  @Output() fretClickEvent = new EventEmitter<[number, number]>();

  onClick(e: Event) {
    const targetElement = e.target as HTMLElement;
    let str: string = targetElement.getAttribute('string')!;
    let fret: string = targetElement.getAttribute('fret')!;
    console.log(`String ${str} Fret ${fret}`);
    this.fretClickEvent.emit([parseInt(str), parseInt(fret)]);
  }
}

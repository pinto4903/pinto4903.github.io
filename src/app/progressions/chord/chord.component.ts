import { Component, Input, OnInit } from '@angular/core';
import { ChordFetcherService, Fingering } from './chord-fetcher.service';

interface svgElement {
  class: string;
  x1: string;
  y1: string;
  x2: string;
  y2: string;
}

@Component({
  selector: 'app-chord',
  standalone: true,
  imports: [],
  templateUrl: './chord.component.html',
  styleUrl: './chord.component.css',
})
export class ChordComponent implements OnInit {
  @Input({ required: true }) chord!: string;
  @Input({ required: true }) variation!: string;

  fingering!: Fingering;
  baseFret = '';
  svgElements: svgElement[] = [];

  constructor(private fetcher: ChordFetcherService) {}

  ngOnInit() {
    // TODO identify base fret, if base + max fret is under 4 do some math
    this.fingering = this.fetcher.getChord(this.chord, parseInt(this.variation));
    console.log(this.fingering);
    const frets = this.fingering.frets;
    const barres = this.fingering.barres;
    const max = this.max(frets);
    if (this.fingering.base + max > 5) this.baseFret = String(this.fingering.base);
    for (let i = 0; i < barres.length; i++) {
      const start = frets.indexOf(barres[i]);
      const end = 6;
      this.svgElements.push({
        class: 'barre',
        x1: start * 14 + 15 + '%',
        y1: (barres[i] - 1) * 20 + 25 + '%',
        x2: (end - start - 1) * 14 + 10 + '%',
        y2: '',
      });
    }
    for (let i = 0; i < frets.length; i++) {
      if (!barres.includes(frets[i])) {
        if (frets[i] == -1) {
          this.svgElements.push({
            class: 'cross',
            x1: i * 14 + 17 + '%',
            y1: '10%',
            x2: i * 14 + 23 + '%',
            y2: '16%',
          });
        } else if (frets[i] == 0) {
          this.svgElements.push({
            class: 'open',
            x1: i * 14 + 20 + '%',
            y1: '13%',
            x2: '',
            y2: '',
          });
        } else {
          this.svgElements.push({
            class: 'finger',
            x1: i * 14 + 20 + '%',
            y1: (frets[i] - 1) * 20 + 30 + '%',
            x2: '',
            y2: '',
          });
        }
      }
    }
  }

  private max(num: number[]) {
    let max = 0;
    for (const i in num) {
      if (num[i] > max) max = num[i];
    }
    return max;
  }
}

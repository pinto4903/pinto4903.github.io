import { Injectable } from '@angular/core';
import chords from '../../../assets/chords.json';

export interface Fingering {
  frets: number[];
  barres: number[];
  base: number;
}

@Injectable({
  providedIn: 'root',
})
export class ChordFetcherService {
  private chords: Map<string, Fingering[]>;

  constructor() {
    this.chords = this.createChordMap(chords.chords);
  }

  // TODO available chords: ["C","C#","D","Eb","E","F","F#","G","Ab","A","Bb","B"], swap fingering for A#, G# and D#, we have fingerings just w/ a different name
  getChord(chord: string, variation: number): Fingering {
    if (this.chords.has(chord)) return this.chords.get(chord)![variation];
    else {
      alert('Chord not found!');
      return { frets: [-1, -1, -1, -1, -1, -1], barres: [], base: 0 };
    }
  }

  getNumberOfVariations(chord: string): number {
    if (this.chords.has(chord)) return this.chords.get(chord)!.length;
    else {
      alert('Chord not found!');
      return -1;
    }
  }

  private createChordMap(
    data: { chord: string; positions: { frets: number[]; barres: number[]; base: number }[] }[]
  ): Map<string, Fingering[]> {
    return new Map(data.map((item) => [item.chord, item.positions]));
  }
}

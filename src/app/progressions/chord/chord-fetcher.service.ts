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

  getChord(chord: string, variation: number): Fingering {
    chord = this.getEquivalentChord(chord);
    if (this.chords.has(chord)) return this.chords.get(chord)![variation];
    else {
      alert('Chord not found! - ' + chord);
      return { frets: [-1, -1, -1, -1, -1, -1], barres: [], base: 0 };
    }
  }

  getNumberOfVariations(chord: string): number {
    chord = this.getEquivalentChord(chord);
    if (this.chords.has(chord)) return this.chords.get(chord)!.length;
    else {
      alert('Chord not found! - ' + chord);
      return -1;
    }
  }

  private getEquivalentChord(chord: string): string {
    let tone, quality: string;
    if (chord.charAt(1) == 'b' || chord.charAt(1) == '#') {
      tone = chord.slice(0, 2);
      quality = chord.slice(2, chord.length);
    } else {
      tone = chord.slice(0, 1);
      quality = chord.slice(1, chord.length);
    }

    switch (tone) {
      case 'Db':
        tone = 'C#';
        break;
      case 'D#':
        tone = 'Eb';
        break;
      case 'E#':
        tone = 'F';
        break;
      case 'Fb':
        tone = 'E';
        break;
      case 'Gb':
        tone = 'F#';
        break;
      case 'G#':
        tone = 'Ab';
        break;
      case 'A#':
        tone = 'Bb';
        break;
      case 'B#':
        tone = 'C';
        break;
      case 'Cb':
        tone = 'B';
        break;
      default:
        tone = tone;
    }

    return tone + quality;
  }

  private createChordMap(
    data: { chord: string; positions: { frets: number[]; barres: number[]; base: number }[] }[]
  ): Map<string, Fingering[]> {
    return new Map(data.map((item) => [item.chord, item.positions]));
  }
}

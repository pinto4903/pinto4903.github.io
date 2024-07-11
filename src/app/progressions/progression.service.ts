import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProgressionService {
  static majorKeys: string[] = [
    'C',
    'G',
    'D',
    'A',
    'E',
    'B',
    'Cb',
    'Gb',
    'F#',
    'Db',
    'C#',
    'Ab',
    'Eb',
    'Bb',
    'F',
  ];
  static minorKeys: string[] = [
    'a',
    'e',
    'b',
    'f#',
    'c#',
    'g#',
    'eb',
    'd#',
    'bb',
    'f',
    'c',
    'g',
    'd',
  ];
  static sharpTones: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  static flatTones: string[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  static majorSuffixes: string[] = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'];
  static major7thSuffixes: string[] = ['maj7', 'm7', 'm7', 'maj7', '7', 'm7', 'm7b5'];
  static minorSuffixes: string[] = ['minor', 'dim', 'major', 'minor', 'major', 'major', 'dim'];
  static minorAltSuffixes: string[] = ['minor', 'minor', 'aug', 'major', 'minor', 'dim', 'major'];
  static minor7thSuffixes: string[] = ['m7', 'dim7', 'm7b5', 'm7', '7', 'maj7', 'dim7'];
  static minorAlt7thSuffixes: string[] = ['m7', 'm7', 'aug7', 'maj7', 'm7', 'dim7', '7']; // dim7 could be m7b5
  static majorSteps: number[] = [2, 2, 1, 2, 2, 2, 1];
  static minorSteps: number[] = [2, 1, 2, 2, 1, 3, 2];
  allowedSuffixes = ['major', 'minor', 'dim', 'aug', '7', 'maj7', 'm7', 'dim7', 'm7b5'];

  keyExists(key: string): boolean {
    if (ProgressionService.majorKeys.includes(key) || ProgressionService.minorKeys.includes(key)) {
      return true;
    }
    return false;
  }

  validKeys(): string {
    return ProgressionService.majorKeys.join(', ') + ', ' + ProgressionService.minorKeys.join(', ');
  }

  getSeventh(chord: string, degree: number, isMinor: boolean): string {
    let tone: string;
    if (chord.charAt(1) == 'b' || chord.charAt(1) == '#') {
      tone = chord.slice(0, 2);
    } else {
      tone = chord.slice(0, 1);
    }
    if (isMinor) return tone + ProgressionService.minor7thSuffixes[degree];
    else return tone + ProgressionService.major7thSuffixes[degree];
  }

  getAlt(chord: string, degree: number): string {
    let tone: string;
    if (chord.charAt(1) == 'b' || chord.charAt(1) == '#') {
      tone = chord.slice(0, 2);
    } else {
      tone = chord.slice(0, 1);
    }
    switch (degree) {
      case 5:
        let idx;
        if (this.isFlat(tone)) {
          idx = ProgressionService.flatTones.indexOf(tone);
          return ProgressionService.flatTones[(idx + 1) % 12] + 'dim';
        } else {
          idx = ProgressionService.sharpTones.indexOf(tone);
          return ProgressionService.sharpTones[(idx + 1) % 12] + 'dim';
        }
      case 6:
        let id;
        if (this.isFlat(tone)) {
          id = ProgressionService.flatTones.indexOf(tone);
          return ProgressionService.flatTones[(id - 1) % 12] + 'major';
        } else {
          id = ProgressionService.sharpTones.indexOf(tone);
          return ProgressionService.sharpTones[(id - 1) % 12] + 'major';
        }
      default:
        return tone + ProgressionService.minorAltSuffixes[degree];
    }
  }

  getAlt7th(chord: string, degree: number): string {
    let tone: string;
    if (chord.charAt(1) == 'b' || chord.charAt(1) == '#') {
      tone = chord.slice(0, 2);
    } else {
      tone = chord.slice(0, 1);
    }
    switch (degree) {
      case 5:
        let idx;
        if (this.isFlat(tone)) {
          idx = ProgressionService.flatTones.indexOf(tone);
          return ProgressionService.flatTones[(idx + 1) % 12] + 'm7b5';
        } else {
          idx = ProgressionService.sharpTones.indexOf(tone);
          return ProgressionService.sharpTones[(idx + 1) % 12] + 'm7b5';
        }
      case 6:
        let id;
        if (this.isFlat(tone)) {
          id = ProgressionService.flatTones.indexOf(tone);
          return ProgressionService.flatTones[(id - 1) % 12] + '7';
        } else {
          id = ProgressionService.sharpTones.indexOf(tone);
          return ProgressionService.sharpTones[(id - 1) % 12] + '7';
        }
      default:
        return tone + ProgressionService.minorAlt7thSuffixes[degree];
    }
  }

  getMajorProgression(key: string): string[] {
    if (!ProgressionService.majorKeys.includes(key)) {
      Error('Unknown major key.');
    }
    const tones = this.isFlat(key) ? ProgressionService.flatTones : ProgressionService.sharpTones;
    const start = tones.indexOf(key);
    const res = [];
    let j = 0;
    for (let i = start; i < 12 + start; i += ProgressionService.majorSteps[j - 1]) {
      res.push(tones[i % 12] + ProgressionService.majorSuffixes[j]);
      j++;
    }
    return res;
  }

  getMinorProgression(key: string): string[] {
    if (!ProgressionService.minorKeys.includes(key)) {
      Error('Unknown minor key.');
    }
    key = key.charAt(0).toUpperCase() + key.slice(1, key.length);
    const tones = this.isFlat(key) ? ProgressionService.flatTones : ProgressionService.sharpTones;
    const start = tones.indexOf(key);
    const res = [];
    let j = 0;
    for (let i = start; i < 12 + start; i += ProgressionService.minorSteps[j - 1]) {
      res.push(tones[i % 12] + ProgressionService.minorSuffixes[j]);
      j++;
    }
    return res;
  }

  private isFlat(key: string): boolean {
    if (key.length == 1 || key.charAt(1) == '#') return false;
    return true;
  }
}

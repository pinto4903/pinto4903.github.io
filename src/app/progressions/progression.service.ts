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
  static minorSuffixes: string[] = ['minor', 'dim', 'major', 'minor', 'major', 'major', 'dim'];
  static majorSteps: number[] = [2, 2, 1, 2, 2, 2, 1];
  static minorSteps: number[] = [2, 1, 2, 2, 1, 2, 2];

  keyExists(key: string): boolean {
    if (
      !ProgressionService.majorKeys.includes(key) &&
      !ProgressionService.minorKeys.includes(key)
    ) {
      return false;
    }
    return true;
  }

  validKeys(): string {
    return ProgressionService.majorKeys.join(', ') + ', ' + ProgressionService.minorKeys.join(', ');
  }

  // TODO return (rare) chords for a key
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

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
    // TODO use lowercase AAAAAAAAAAAAAAAAAAAAAA
    'A',
    'E',
    'B',
    'F#',
    'C#',
    'G#',
    'Eb',
    'D#',
    'Bb',
    'F',
    'C',
    'G',
    'D',
  ];
  static sharpTones: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  static flatTones: string[] = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
  static majorSuffixes: string[] = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'dim'];
  static majorSteps: number[] = [2, 2, 1, 2, 2, 2, 1];

  // TODO return progressions for a given chord
  // TODO add SEVENTH CHORDS RAAAAAAAAAAAAAAAAAAAAA
  // TODO make ?something? to return a chord view for a given chord
  constructor() {}

  getMajorProgression(key: string): string[] {
    if (!ProgressionService.majorKeys.includes(key)) {
      return [
        'Unknown or theoretical key. Possible values: ' + ProgressionService.majorKeys.join(', '),
      ];
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
      return [
        'Unknown or theoretical key. Possible values: ' + ProgressionService.minorKeys.join(', '),
      ];
    }
    return ProgressionService.sharpTones;
  }

  private isFlat(key: string): boolean {
    if (key.length == 1 || key.charAt(1) == '#') return false;
    return true;
  }
}

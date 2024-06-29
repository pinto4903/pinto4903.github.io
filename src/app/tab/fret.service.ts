import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FretService {
  private noteSubject: Subject<GuitarFret> = new Subject<any>();
  public note$: Observable<GuitarFret> = this.noteSubject.asObservable();

  private chordSubject: Subject<GuitarFret[]> = new Subject<any>();
  public chord$: Observable<GuitarFret[]> = this.chordSubject.asObservable();

  constructor() {}

  setNote(note: GuitarFret) {
    this.noteSubject.next(note);
  }

  setChord(chord: GuitarFret[]) {
    this.chordSubject.next(chord);
  }
}

export interface GuitarFret {
  str: number;
  fret: number;
}

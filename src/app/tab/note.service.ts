import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private noteSubject: Subject<string> = new Subject<any>();
  public note$: Observable<string> = this.noteSubject.asObservable();

  private chordSubject: Subject<string[]> = new Subject<any>();
  public chord$: Observable<string[]> = this.chordSubject.asObservable();

  constructor() {}

  setNote(note: string) {
    this.noteSubject.next(note);
  }

  setChord(chord: string[]) {
    this.chordSubject.next(chord);
  }
}

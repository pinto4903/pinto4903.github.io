import { Component, HostListener, OnDestroy } from '@angular/core';
import * as Tone from 'tone';
import { NoteService } from '../note.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent implements OnDestroy {
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
  isPlaying = false;
  ctrlPressed = false;
  noteSubscription: Subscription;
  chordSubscription: Subscription;

  constructor(private noteService: NoteService) {
    this.noteSubscription = this.noteService.note$.subscribe((note) => {
      this.playNote(note);
    });
    this.chordSubscription = this.noteService.chord$.subscribe((chord) => {
      this.playChord(chord);
    });
  }

  ngOnDestroy(): void {
    this.noteSubscription.unsubscribe();
    this.chordSubscription.unsubscribe();
  }

  @HostListener('window:keydown.control', ['$event'])
  handleCtrlDown(event: KeyboardEvent) {
    if (!this.ctrlPressed) this.isPlaying = !this.isPlaying;
    this.ctrlPressed = true;
  }

  @HostListener('window:keyup.control', ['$event'])
  handleCtrlUp(event: KeyboardEvent) {
    this.ctrlPressed = false;
  }

  playNote(e: string) {
    if (this.isPlaying) this.sampler.triggerAttackRelease(e, '2n');
  }

  playChord(e: string[]) {
    if (this.isPlaying)
      for (const i in e) {
        this.sampler.triggerAttackRelease(e[i], '2n');
      }
  }
}

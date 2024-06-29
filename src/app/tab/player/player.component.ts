import { Component, HostListener } from '@angular/core';
import * as Tone from 'tone';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent {
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
  isPlaying: boolean = false;
  ctrlPressed: boolean = false;

  constructor(private noteService: NoteService) {
    this.noteService.note$.subscribe((note) => {
      this.playNote(note);
    });
    this.noteService.chord$.subscribe((chord) => {
      this.playChord(chord);
    });
  }

  @HostListener('window:keydown.control', ['$event']) handleKeyDown(event: KeyboardEvent) {
    if (!this.ctrlPressed) this.isPlaying = !this.isPlaying;
    this.ctrlPressed = true;
  }

  @HostListener('window:keyup.control', ['$event']) handleKeyUp(event: KeyboardEvent) {
    this.isPlaying = !this.isPlaying;
    this.ctrlPressed = false;
  }

  playNote(e: string) {
    if (this.isPlaying) this.sampler.triggerAttackRelease(e, '2n');
  }

  playChord(e: string[]) {
    if (this.isPlaying)
      for (let i in e) {
        this.sampler.triggerAttackRelease(e[i], '2n');
      }
  }
}

import { Component } from '@angular/core';
import { FretboardComponent } from './fretboard/fretboard.component';
import { SafeHtml } from '@angular/platform-browser';
import { PlayerComponent } from './player/player.component';
import { NoteService } from './note.service';
import { FretService } from './fret.service';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [FretboardComponent, PlayerComponent],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
})
export class TabComponent {
  tab: SafeHtml = '';

  constructor(private fretService: FretService) {
    this.fretService.note$.subscribe((note) => {
      this.changeTab(note.str, note.fret);
    });
  }

  changeTab(str: number, fret: number) {
    this.tab += str + '-' + fret + ' ';
  }
}

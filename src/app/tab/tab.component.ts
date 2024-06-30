import { Component } from '@angular/core';
import { FretboardComponent } from './fretboard/fretboard.component';
import { PlayerComponent } from './player/player.component';
import { TablatureComponent } from './tablature/tablature.component';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [FretboardComponent, PlayerComponent, TablatureComponent],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
})
export class TabComponent {}

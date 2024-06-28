import { Component } from '@angular/core';
import { FretboardComponent } from './fretboard/fretboard.component';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-tab',
  standalone: true,
  imports: [FretboardComponent],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css',
})
export class TabComponent {
  tab: SafeHtml = '';

  ChangeTab(event: [number, number]) {
    this.tab += event + ' ';
  }
}

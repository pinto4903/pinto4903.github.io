import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FretboardComponent } from './tab/fretboard/fretboard.component';
import { AppHeaderComponent } from './app-header/app-header.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppHeaderComponent, FretboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}

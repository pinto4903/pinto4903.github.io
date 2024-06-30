import { Routes } from '@angular/router';
import { TabComponent } from './tab/tab.component';
import { AppHomeComponent } from './app-home/app-home.component';
import { ProgressionsComponent } from './progressions/progressions.component';

export const routes: Routes = [
  { path: '', title: 'Home Page', component: AppHomeComponent },
  { path: 'tab', title: 'Tab Maker', component: TabComponent },
  { path: 'progressions', title: 'Chord Progressions', component: ProgressionsComponent },
];

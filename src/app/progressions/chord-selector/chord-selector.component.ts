import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { DotSelectorComponent } from './dot-selector/dot-selector.component';
import { ChordFetcherService } from '../chord/chord-fetcher.service';
import { ChordComponent } from '../chord/chord.component';

@Component({
  selector: 'app-chord-selector',
  standalone: true,
  templateUrl: './chord-selector.component.html',
  styleUrl: './chord-selector.component.css',
  imports: [DotSelectorComponent, ChordComponent],
})
export class ChordSelectorComponent implements OnInit, OnChanges {
  @Input({ required: true }) chord!: string;
  currentVariation = 0;
  numberVariations!: number;

  constructor(private chordFetcherService: ChordFetcherService) {}

  ngOnInit() {
    this.numberVariations = this.chordFetcherService.getNumberOfVariations(this.chord);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.numberVariations = this.chordFetcherService.getNumberOfVariations(this.chord);
  }

  onSelectChange(event: number) {
    this.currentVariation = event;
  }
}

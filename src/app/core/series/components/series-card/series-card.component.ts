import { Component, Input } from '@angular/core';
import { Series } from '../../../../interfaces/series';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'kk-series-card',
  templateUrl: './series-card.component.html',
  styleUrls: [ './series-card.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    RouterLink,
  ],
})
export class SeriesCardComponent {
  @Input() series: Series;
}

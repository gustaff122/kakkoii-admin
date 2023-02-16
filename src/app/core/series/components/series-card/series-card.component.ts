import { Component, Input } from '@angular/core';
import { Series } from '../../../../interfaces/series';

@Component({
  selector: 'kk-series-card',
  templateUrl: './series-card.component.html',
  styleUrls: [ './series-card.component.scss' ],
})
export class SeriesCardComponent {
  @Input() series: Series;
}

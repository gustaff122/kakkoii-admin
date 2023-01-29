import { Component, Input } from '@angular/core';

@Component({
  selector: 'kk-series-card',
  templateUrl: './series-card.component.html',
  styleUrls: [ './series-card.component.scss' ],
})
export class SeriesCardComponent {
  @Input() series: any;
}

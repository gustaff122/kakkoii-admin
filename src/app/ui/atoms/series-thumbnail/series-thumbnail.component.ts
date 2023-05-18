import { Component, Input } from '@angular/core';
import { Series } from '@kakkoii/interfaces/series';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SimpleModalService } from 'ngx-simple-modal';
import { SeriesModal } from '../../molecules/series-modal/series-modal.component';

@Component({
  selector: 'kk-series-thumbnail',
  templateUrl: './series-thumbnail.component.html',
  styleUrls: [ './series-thumbnail.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
})
export class SeriesThumbnailComponent {
  @Input() public series: Series;

  constructor(
    private readonly simpleModalService: SimpleModalService,
  ) {
  }

  public showConfirm(): void {
    this.simpleModalService.addModal(SeriesModal, {
      titleEn: this.series.titleEn,
      pseudo: this.series.pseudo,
    });
  }
}

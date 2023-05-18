import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { SimpleModalService } from 'ngx-simple-modal';
import { EpisodeManageModal } from '../episode-manage-modal/episode-manage-modal.component';

@Component({
  selector: 'kk-episode-button',
  templateUrl: './episode-button.component.html',
  styleUrls: [ './episode-button.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
  ],
  standalone: true,
})
export class EpisodeButtonComponent {
  @Input() episode: SeriesEpisode;
  @Input() pseudo: string;

  constructor(
    private readonly simpleModalService: SimpleModalService,
  ) {
  }

  public openModalHandler(): void {
    this.simpleModalService.addModal(EpisodeManageModal, {
      pseudo: this.pseudo,
      epNumber: this.episode.number,
    });
  }
}

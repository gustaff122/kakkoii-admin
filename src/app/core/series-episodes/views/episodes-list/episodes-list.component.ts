import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodesListComponentStore } from './episodes-list.component.store';
import { Observable } from 'rxjs';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DirectionType } from '@kakkoii/types/direction-type';
import { EpisodeButtonComponent } from '@kakkoii/ui/molecules/episode-button/episode-button.component';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { Series } from '@kakkoii/interfaces/series';

@Component({
  selector: 'kk-episodes-list',
  templateUrl: './episodes-list.component.html',
  styleUrls: [ './episodes-list.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EpisodesListComponentStore,
  ],
  imports: [
    CommonModule,
    RouterLink,
    EpisodeButtonComponent,
  ],
  standalone: true,
})
export class EpisodesListComponent implements OnInit {
  public direction: DirectionType = 'asc';

  public readonly series: Series = this.activatedRoute.snapshot.data[SERIES];

  public readonly episodes$: Observable<SeriesEpisode[]> = this.seriesPageEpisodesListComponentStore.episodes$;
  public readonly canLoadMore$: Observable<boolean> = this.seriesPageEpisodesListComponentStore.canLoadMore$;
  public readonly totalCount$: Observable<number | null> = this.seriesPageEpisodesListComponentStore.totalCount$;
  public readonly loading$: Observable<boolean> = this.seriesPageEpisodesListComponentStore.loading$;

  constructor(
    @Self() private readonly seriesPageEpisodesListComponentStore: EpisodesListComponentStore,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.seriesPageEpisodesListComponentStore.getEpisodes({ direction: this.direction });
  }

  public loadEpisodesHandler(): void {
    this.seriesPageEpisodesListComponentStore.getEpisodes({ direction: this.direction });
  }

  public setDirectionAscHandler(): void {
    this.direction = 'asc';
    this.seriesPageEpisodesListComponentStore.changeDirection({ direction: this.direction });
  }

  public setDirectionDescHandler(): void {
    this.direction = 'desc';
    this.seriesPageEpisodesListComponentStore.changeDirection({ direction: this.direction });
  }

  public trackByFn(_index: number, episode: SeriesEpisode): number {
    return episode.number;
  }
}

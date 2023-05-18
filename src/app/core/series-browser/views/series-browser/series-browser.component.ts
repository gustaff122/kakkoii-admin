import { ChangeDetectionStrategy, Component, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesListComponent } from '@kakkoii/ui/molecules/series-list/series-list.component';
import { SeriesBrowserComponentStore } from './series-browser.component.store';
import { Observable } from 'rxjs';
import { SeriesSearchBarComponent } from './components/series-search-bar/series-search-bar.component';
import { InfiniteScrollComponent } from '@kakkoii/utils/infinite-scroll/infinite-scroll.component';
import { SeriesListFilters } from '@kakkoii/interfaces/series-list-filters';
import { SeriesCurrentSeasonListComponent } from '@kakkoii/ui/organisms/series-current-season-list/series-current-season-list.component';

@Component({
  selector: 'kk-series-browser',
  templateUrl: './series-browser.component.html',
  styleUrls: [ './series-browser.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    SeriesBrowserComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    SeriesListComponent,
    SeriesSearchBarComponent,
    InfiniteScrollComponent,
    SeriesListComponent,
    SeriesCurrentSeasonListComponent,
  ],
})
export class SeriesBrowserComponent {
  public readonly series$: Observable<Series[]> = this.seriesBrowserComponentStore.series$;
  public readonly filters$: Observable<Partial<SeriesListFilters> | null> = this.seriesBrowserComponentStore.filters$;
  public readonly loading$: Observable<boolean> = this.seriesBrowserComponentStore.loading$;

  constructor(
    @Self() private readonly seriesBrowserComponentStore: SeriesBrowserComponentStore,
  ) {
  }

  public getFirstPageHandler(filters: Partial<SeriesListFilters>): void {
    console.log(filters);

    if (filters.year || filters.season || filters.status || filters.tags || filters.name || filters.type) {
      this.seriesBrowserComponentStore.getSeries({ filters });
    }
  }

  public nextPageHandler(): void {
    this.seriesBrowserComponentStore.getNextPage();
  }
}
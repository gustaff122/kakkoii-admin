import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '../../../../utils/default.component.store';
import { Series } from '../../../../interfaces/series';
import { SeriesService } from '../../../../services/series.service';
import { Paginator } from '../../../../interfaces/paginator';

interface SeriesListComponentState extends DefaultComponentState {
  series: Series[] | null;
  totalCount: number;
  page: number;
}

@Injectable()
export class SeriesListComponentStore extends DefaultComponentStore<SeriesListComponentState> {

  public readonly series$: Observable<Series[] | null> = this.select((state) => state.series);

  public readonly getSeriesListFirstPage = this.effect((origin$: Observable<{ name: string }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
          page: 0,
        });
      }),
      exhaustMap(({ name }) => {
        const paginator: Paginator = {
          limit: 20,
          page: this.get().page,
        };

        const filters: { name: string } = {
          name,
        };

        return this.seriesService.getSeriesList(paginator, filters).pipe(
          tapResponse(({ series, totalCount }) => {
            this.patchState({
              series,
              totalCount,
              page: this.get().page + 1,
              loading: false,
              error: null,
            });
          }, ({ error }: HttpErrorResponse) => {
            this.patchState({
              loading: false,
              error,
            });
          }),
        );
      }),
    );
  });

  public readonly getSeriesListNextPage = this.effect((origin$: Observable<{ name: string }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState((state) => {
          return {
            loading: state.series ? (Object.keys(state.series).length < state.totalCount) : true,
          };
        });
      }),
      exhaustMap(({ name }) => {
        const paginator: Paginator = {
          limit: 20,
          page: this.get().page,
        };

        const filters: { name: string } = {
          name,
        };

        return this.seriesService.getSeriesList(paginator, filters).pipe(
          tapResponse(({ series, totalCount }) => {
            this.patchState((state) => {
              return {
                ...state,
                series: paginator.page > 0 ? [ ...state.series, ...series ] : series,
                totalCount,
                page: this.get().page + 1,
                loading: false,
                error: null,
              };
            });
          }, ({ error }: HttpErrorResponse) => {
            this.patchState({
              loading: false,
              error,
            });
          }),
        );
      }),
    );
  });

  constructor(
    private readonly seriesService: SeriesService,
  ) {
    super({
      series: [],
      totalCount: 0,
      page: 0,
      loading: false,
      error: null,
    });
  }
}
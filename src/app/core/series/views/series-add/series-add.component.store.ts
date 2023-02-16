import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '../../../../utils/default.component.store';
import { Series } from '../../../../interfaces/series';
import { SeriesService } from '../../../../services/series.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

interface SeriesAddComponentState extends DefaultComponentState {
  thumbnail: File | null;
  image: File | null;
}

@Injectable()
export class SeriesAddComponentStore extends DefaultComponentStore<SeriesAddComponentState> {

  public readonly thumbnail$: Observable<File | null> = this.select((state) => state.thumbnail);
  public readonly image$: Observable<File | null> = this.select((state) => state.image);

  public readonly setImage = this.updater((state, { image }: { image: File | null }): SeriesAddComponentState => {
    return {
      ...state,
      image,
    };
  });

  public readonly setThumbnail = this.updater((state, { thumbnail }: { thumbnail: File | null }): SeriesAddComponentState => {
    return {
      ...state,
      thumbnail,
    };
  });

  public readonly addSeries = this.effect((origin$: Observable<{ series: Series }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ series }) => {
        const thumbnail = this.get().thumbnail;
        const image = this.get().image;
        const formData = new FormData();

        formData.append('titleEn', series.titleEn);
        formData.append('titleJpRom', series.titleJpRom);
        series.titlesAlt?.map(title => formData.append('titlesAlt[]', title));
        formData.append('startDate', series.startDate);
        formData.append('endDate', series.endDate);
        formData.append('synopsis', series.synopsis);
        series.tags.map(tag => formData.append('tags[]', tag));
        formData.append('thumbnailUrl', series?.thumbnailUrl);
        formData.append('ageRating', series.ageRating);
        formData.append('type', series.type);
        formData.append('episodeDuration', series?.episodeDuration.toString());
        formData.append('episodesCount', series?.episodesCount.toString());
        formData.append('nsfw', series?.nsfw.toString());
        formData.append('studio', series?.studio);
        formData.append('status', series.status);

        formData.append('thumbnail', thumbnail);
        formData.append('image', image);

        return this.seriesService.addNewSeries(formData).pipe(
          tapResponse(() => {
            this.patchState({
              loading: false,
            });

            this.router.navigate([ 'series' ]).then(() => {
              this.matSnackBar.open('Seria została dodana!');
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
    private readonly router: Router,
    private readonly matSnackBar: MatSnackBar,
  ) {
    super({
      thumbnail: null,
      image: null,
      loading: false,
      error: null,
    });
  }
}
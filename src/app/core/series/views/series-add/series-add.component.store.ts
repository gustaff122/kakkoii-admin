import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '../../../../utils/default.component.store';
import { Series } from '../../../../interfaces/series';
import { SeriesService } from '../../../../services/series.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { generateUuid } from '../../../../utils/generate-uuid';

interface SeriesAddComponentState extends DefaultComponentState {
  series: Series | null;
  thumbnail: File | null;
  image: File | null;
}

@Injectable()
export class SeriesAddComponentStore extends DefaultComponentStore<SeriesAddComponentState> {

  public readonly thumbnail$: Observable<File | null> = this.select((state) => state.thumbnail);
  public readonly image$: Observable<File | null> = this.select((state) => state.image);

  public readonly setImage = this.updater((state, { image }: { image: File | null }): SeriesAddComponentState => {
    if (image.type === 'image/jpg' || image.type === 'image/jpeg') {
      const fixedImage = new File([ image ], `${generateUuid()}.jpg`, { type: image.type });

      return {
        ...state,
        image: fixedImage,
      };
    } else {
      this.matSnackBar.open('Plik musi być w formacie .jpg');
      return {
        ...state,
      };
    }
  });

  public readonly setThumbnail = this.updater((state, { thumbnail }: { thumbnail: File | null }): SeriesAddComponentState => {
    if (thumbnail.type === 'image/jpg' || thumbnail.type === 'image/jpeg') {
      const fixedThumbnail = new File([ thumbnail ], `${generateUuid()}.jpg`, { type: thumbnail.type });

      return {
        ...state,
        thumbnail: fixedThumbnail,
      };
    } else {
      this.matSnackBar.open('Plik musi być w formacie .jpg');
      return {
        ...state,
      };
    }
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
        formData.append('titleJp', series.titleJp);
        formData.append('titleJpRom', series.titleJpRom);
        series.titlesAlt?.map(title => formData.append('titlesAlt[]', title));
        formData.append('startDate', series.startDate);
        formData.append('endDate', series.endDate);
        formData.append('synopsis', series.synopsis);
        series.tags.map(tag => formData.append('tags[]', tag));
        formData.append('thumbnailUrl', series?.thumbnailUrl);
        formData.append('ageRating', series.ageRating);
        formData.append('type', series.type);
        if (series.episodeDuration) {
          formData.append('episodeDuration', series.episodeDuration.toString());
        }

        if (series.episodesCount) {
          formData.append('episodesCount', series?.episodesCount?.toString());
        }


        formData.append('nsfw', series?.nsfw.toString());
        formData.append('studio', series?.studio);
        formData.append('source', series.source);
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

  public readonly patchSeries = this.effect((origin$: Observable<{ seriesId: string, series: Series }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ seriesId, series }) => {
        const thumbnail = this.get().thumbnail;
        const image = this.get().image;
        const formData = new FormData();

        formData.append('titleEn', series.titleEn);
        formData.append('titleJp', series.titleJp);
        formData.append('titleJpRom', series.titleJpRom);
        series.titlesAlt?.map(title => formData.append('titlesAlt[]', title));
        formData.append('startDate', series.startDate);
        formData.append('endDate', series.endDate);
        formData.append('synopsis', series.synopsis);
        series.tags.map(tag => formData.append('tags[]', tag));
        formData.append('thumbnailUrl', series?.thumbnailUrl);
        formData.append('ageRating', series.ageRating);
        formData.append('type', series.type);
        formData.append('episodeDuration', series?.episodeDuration?.toString());
        formData.append('episodesCount', series?.episodesCount?.toString());
        formData.append('nsfw', series?.nsfw.toString());
        formData.append('studio', series?.studio);
        formData.append('source', series.source);
        formData.append('status', series.status);

        formData.append('thumbnail', thumbnail);
        formData.append('image', image);

        return this.seriesService.patchSeries(seriesId, formData).pipe(
          tapResponse(() => {
            this.patchState({
              loading: false,
            });

            this.router.navigate([ 'series' ]).then(() => {
              this.matSnackBar.open('Seria została zaktualizowana!');
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

  public readonly getSeries = this.effect((origin$: Observable<{ seriesId: string, callbackFn: (series: Series) => void }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ seriesId, callbackFn }) => {
        return this.seriesService.getSeries(seriesId).pipe(
          tapResponse((series) => {
            this.patchState({
              series,
              loading: false,
            });

            callbackFn(series);
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
      series: null,
      thumbnail: null,
      image: null,
      loading: false,
      error: null,
    });
  }
}
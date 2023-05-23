import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Series } from '@kakkoii/interfaces/series';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { SeriesService } from '@kakkoii/services/series.service';
import { Router } from '@angular/router';
import { generateUuid } from '@kakkoii/utils/generate-uuid';
import { ToastrService } from 'ngx-toastr';

interface AddSeriesComponentState extends DefaultComponentState {
  series: Series | null;
  thumbnail: File | null;
  image: File | null;
}

@Injectable()
export class AddSeriesComponentStore extends DefaultComponentStore<AddSeriesComponentState> {

  public readonly thumbnail$: Observable<File | null> = this.select((state) => state.thumbnail);
  public readonly image$: Observable<File | null> = this.select((state) => state.image);

  public readonly setImage = this.updater((state, { image }: { image: File | null }): AddSeriesComponentState => {
    if (image.type === 'image/jpg' || image.type === 'image/jpeg') {
      const fixedImage = new File([ image ], `${generateUuid()}.jpg`, { type: image.type });
      return {
        ...state,
        image: fixedImage,
      };
    } else {
      this.toastrService.error('Plik musi być w formacie .jpg');
      return {
        ...state,
      };
    }
  });

  public readonly setThumbnail = this.updater((state, { thumbnail }: { thumbnail: File | null }): AddSeriesComponentState => {
    if (thumbnail.type === 'image/jpg' || thumbnail.type === 'image/jpeg') {
      const fixedThumbnail = new File([ thumbnail ], `${generateUuid()}.jpg`, { type: thumbnail.type });

      return {
        ...state,
        thumbnail: fixedThumbnail,
      };
    } else {
      this.toastrService.error('Plik musi być w formacie .jpg');
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

        if (series.titlesAlt && series.titlesAlt.length > 0) {
          series.titlesAlt.map(title => formData.append('titlesAlt[]', title));
        }

        if (series.startDate) {
          formData.append('startDate', series.startDate);
        }

        if (series.endDate) {
          formData.append('endDate', series.endDate);
        }

        formData.append('synopsis', series.synopsis);

        if (series.tags && series.tags.length > 0) {
          series.tags.map(tag => formData.append('tags[]', tag));
        }

        formData.append('thumbnailUrl', series?.thumbnailUrl);
        formData.append('ageRating', series.ageRating);
        formData.append('type', series.type);

        if (series.episodeDuration) {
          formData.append('episodeDuration', series.episodeDuration.toString());
        }

        if (series.episodesCount) {
          formData.append('episodesCount', series.episodesCount.toString());
        }

        formData.append('nsfw', series.nsfw.toString());
        formData.append('studio', series.studio);
        formData.append('source', series.source);
        formData.append('status', series.status);

        formData.append('thumbnail', thumbnail);
        formData.append('image', image);

        return this.seriesService.addNewSeries(formData).pipe(
          tapResponse(() => {
            this.patchState({
              loading: false,
            });

            this.router.navigate([ '/browser' ]).then(() => {
              this.toastrService.success('Seria została dodana');
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
    private readonly toastrService: ToastrService,
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
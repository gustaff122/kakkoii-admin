import { Component, OnInit, Self } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeriesDatesForm, SeriesMoreForm, SeriesRestForm, SeriesTitlesForm } from '../../../../interfaces/series-form';
import { seriesTagsSet } from '../../../../data/series-tags-set';
import { SeriesTags } from '../../../../types/series-tags';
import { SeriesStatus } from '../../../../types/series-status';
import { seriesStatusSet } from '../../../../data/series-status-set';
import { SeriesAgeRating } from '../../../../types/series-age-rating';
import { seriesAgeRatingSet } from '../../../../data/series-age-rating-set';
import { SeriesAddComponentStore } from './series-add.component.store';
import { Series } from '../../../../interfaces/series';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { Observable } from 'rxjs';
import { KkTextareaComponent } from '../../../../ui/kk-textarea/kk-textarea.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { KkInputComponent } from '../../../../ui/kk-input/kk-input.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { LoadingSpinnerComponent } from '../../../../utils/loading-spinner/loading-spinner.component';
import { urlToFile } from '../../../../utils/url-to-file';

@Component({
  selector: 'kk-series-add',
  templateUrl: './series-add.component.html',
  styleUrls: [ './series-add.component.scss' ],
  providers: [
    SeriesAddComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    KkTextareaComponent,
    NgSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    KkInputComponent,
    MatIconModule,
    NgxDropzoneModule,
    LoadingSpinnerComponent,
  ],
})
export class SeriesAddComponent implements OnInit {

  public isCreating: boolean = (!this.activatedRoute.snapshot.params['id']);
  public readonly loading$: Observable<boolean> = this.seriesAddComponentStore.loading$;
  public readonly thumbnail$: Observable<File | null> = this.seriesAddComponentStore.thumbnail$;
  public readonly image$: Observable<File | null> = this.seriesAddComponentStore.image$;

  public readonly tags: SeriesTags[] = seriesTagsSet;
  public readonly statuses: SeriesStatus[] = seriesStatusSet;
  public readonly ageRatings: SeriesAgeRating[] = seriesAgeRatingSet;
  public formTitles: FormGroup<SeriesTitlesForm>;
  public formMore: FormGroup<SeriesMoreForm>;
  public formDates: FormGroup<SeriesDatesForm>;
  public formRest: FormGroup<SeriesRestForm>;
  public step = 0;

  constructor(
    @Self() private readonly seriesAddComponentStore: SeriesAddComponentStore,
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    const seriesId = this.activatedRoute.snapshot.params['id'];
    this.buildForm();
    this.initForm();

    if (seriesId) {
      this.seriesAddComponentStore.getSeries({
        seriesId, callbackFn: (series) => {
          this.patchForm(series);
        },
      });
    }
  }

  public get titlesAlt(): FormArray {
    return this.formTitles.get('titlesAlt') as FormArray;
  }

  public addTitleAlt(): void {
    this.titlesAlt.push(this.buildTitleAlt());
  }

  public removeTitleAlt(index: number): void {
    this.titlesAlt.removeAt(index);
  }

  public confirmSeries(): void {
    const seriesId = this.activatedRoute.snapshot.params['id'];

    let fixedForm: any = { ...this.formTitles.getRawValue(), ...this.formMore.getRawValue(), ...this.formDates.getRawValue(), ...this.formRest.getRawValue() };
    fixedForm.titlesAlt = fixedForm.titlesAlt.map((obj: any) => obj.title);
    let series: Series = fixedForm;

    if (this.formRest.valid) {
      if (seriesId) {
        this.seriesAddComponentStore.patchSeries({ seriesId, series });
      } else {
        this.seriesAddComponentStore.addSeries({ series });
      }
    }
  }

  public onSelectPoster(file: NgxDropzoneChangeEvent): void {
    this.seriesAddComponentStore.setThumbnail({ thumbnail: file.addedFiles[0] });
  }

  public onSelectImage(file: NgxDropzoneChangeEvent): void {
    this.seriesAddComponentStore.setImage({ image: file.addedFiles[0] });
  }

  public nextStep(): void {
    this.step += 1;
  }

  public prevStep(): void {
    this.step -= 1;
  }

  private initForm(): void {
    this.titlesAlt.push(this.buildTitleAlt());
  }

  private buildTitleAlt(): FormGroup<{ title: FormControl<string> }> {
    return this.formBuilder.group<{ title: FormControl<string> }>({
      title: new FormControl(null),
    });
  }

  private buildForm(): void {
    this.formTitles = this.formBuilder.group<SeriesTitlesForm>({
      titleEn: new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(256) ]),
      titleJpRom: new FormControl(null, [ Validators.required, Validators.maxLength(256) ]),
      titleJp: new FormControl(null, [ Validators.required, Validators.maxLength(256) ]),
      titlesAlt: new FormArray([]),
    });

    this.formMore = this.formBuilder.group<SeriesMoreForm>({
      synopsis: new FormControl(null, [ Validators.required, Validators.maxLength(1024) ]),
      tags: new FormControl(null, [ Validators.required ]),
      studio: new FormControl(null),
      nsfw: new FormControl(null, [ Validators.required ]),
      source: new FormControl(null, [ Validators.required ]),
    });

    this.formDates = this.formBuilder.group<SeriesDatesForm>({
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      episodeDuration: new FormControl(24),
      episodesCount: new FormControl(12),
      ageRating: new FormControl(null, [ Validators.required ]),
      status: new FormControl(null, [ Validators.required ]),
    });

    this.formRest = this.formBuilder.group<SeriesRestForm>({
      type: new FormControl(null, [ Validators.required ]),
      trailerUrl: new FormControl(null),
    });
  }

  private patchForm(series: Series): void {
    const titlesAlt = series.titlesAlt.map(title => ({ title }));
    const { titleEn, titleJp, titleJpRom } = series;
    this.formTitles.patchValue({ titleEn, titleJp, titleJpRom, titlesAlt });

    const { synopsis, source, nsfw, studio, tags } = series;
    this.formMore.patchValue({ synopsis, source, nsfw, studio, tags });

    const { startDate, endDate, episodeDuration, episodesCount, ageRating, status } = series;
    this.formDates.patchValue({ startDate, endDate, episodeDuration, episodesCount, ageRating, status });

    const { type, trailerUrl } = series;
    this.formRest.patchValue({ type, trailerUrl });

    urlToFile(series.imageUrl).then((image) => {
      this.seriesAddComponentStore.setImage({ image });
    });

    urlToFile(series.thumbnailUrl).then((thumbnail) => {
      this.seriesAddComponentStore.setThumbnail({ thumbnail });
    });

  }


}

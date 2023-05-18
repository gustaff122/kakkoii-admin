import { Component, OnInit, Self } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SeriesForm } from '@kakkoii/interfaces/series-form';
import { InputComponent } from '@kakkoii/ui/atoms/input/input.component';
import { NgxDropzoneChangeEvent, NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { SeriesTags } from '@kakkoii/types/series-tags';
import { seriesAgeRatingSet } from '@kakkoii/data/series-age-rating-set';
import { Observable } from 'rxjs';
import { TextareaComponent } from '@kakkoii/ui/atoms/textarea/textarea.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { seriesTagsSet } from '@kakkoii/data/series-tags-set';
import { EditSeriesFormComponentStore } from './edit-series-form.component.store';
import { LoadingSpinnerComponent } from '@kakkoii/utils/loading-spinner/loading-spinner.component';
import { SeriesAgeRating } from '@kakkoii/types/series-age-rating';
import { Series } from '@kakkoii/interfaces/series';
import { urlToFile } from '@kakkoii/utils/url-to-file';
import { ActivatedRoute } from '@angular/router';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';

@Component({
  selector: 'kk-edit-series-form',
  templateUrl: './edit-series-form.component.html',
  styleUrls: [ './edit-series-form.component.scss' ],
  providers: [
    EditSeriesFormComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    TextareaComponent,
    NgSelectModule,
    ReactiveFormsModule,
    InputComponent,
    NgxDropzoneModule,
    LoadingSpinnerComponent,
  ],
})
export class EditSeriesFormComponent implements OnInit {

  public readonly series: Series = this.activatedRoute.snapshot.data[SERIES];

  public readonly loading$: Observable<boolean> = this.editSeriesFormComponentStore.loading$;
  public readonly thumbnail$: Observable<File | null> = this.editSeriesFormComponentStore.thumbnail$;
  public readonly image$: Observable<File | null> = this.editSeriesFormComponentStore.image$;

  public readonly tags: SeriesTags[] = seriesTagsSet;
  public readonly ageRatings: SeriesAgeRating[] = seriesAgeRatingSet;
  public form: FormGroup<SeriesForm>;

  constructor(
    @Self() private readonly editSeriesFormComponentStore: EditSeriesFormComponentStore,
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.initForm();
    this.patchForm();
  }

  public get titlesAlt(): FormArray {
    return this.form.get('titlesAlt') as FormArray;
  }

  public addTitleAlt(): void {
    this.titlesAlt.push(this.buildTitleAlt());
  }

  public removeTitleAlt(index: number): void {
    this.titlesAlt.removeAt(index);
  }

  public patchSeriesHandler(): void {
    if (this.form.valid) {
      let series: any = this.form.getRawValue();
      series.titlesAlt = series.titlesAlt.map((obj: any) => obj.title);

      this.editSeriesFormComponentStore.patchSeries({ series });
    }
  }

  public selectPosterHandler(file: NgxDropzoneChangeEvent): void {
    this.editSeriesFormComponentStore.setThumbnail({ thumbnail: file.addedFiles[0] });
  }

  public selectImageHandler(file: NgxDropzoneChangeEvent): void {
    this.editSeriesFormComponentStore.setImage({ image: file.addedFiles[0] });
  }

  private initForm(): void {
    this.series.titlesAlt.forEach(() => {
      this.titlesAlt.push(this.buildTitleAlt());
    });
  }

  private buildTitleAlt(): FormGroup<{ title: FormControl<string> }> {
    return this.formBuilder.group<{ title: FormControl<string> }>({
      title: new FormControl(null),
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<SeriesForm>({
      titleEn: new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(256) ]),
      titleJpRom: new FormControl(null, [ Validators.required, Validators.maxLength(256) ]),
      titleJp: new FormControl(null, [ Validators.required, Validators.maxLength(256) ]),
      titlesAlt: new FormArray([]),

      synopsis: new FormControl(null, [ Validators.required, Validators.maxLength(1024) ]),
      tags: new FormControl(null, [ Validators.required ]),
      studio: new FormControl(null),
      nsfw: new FormControl(null, [ Validators.required ]),
      source: new FormControl(null, [ Validators.required ]),

      startDate: new FormControl(null),
      endDate: new FormControl(null),
      episodeDuration: new FormControl(24),
      episodesCount: new FormControl(12),
      ageRating: new FormControl(null, [ Validators.required ]),
      status: new FormControl(null, [ Validators.required ]),

      type: new FormControl(null, [ Validators.required ]),
      trailerUrl: new FormControl(null),
    });
  }

  private patchForm(): void {
    const titlesAlt = this.series.titlesAlt.map(title => ({ title }));

    this.form.patchValue({ ...this.series, titlesAlt });

    urlToFile(this.series.imageUrl).then((image) => {
      this.editSeriesFormComponentStore.setImage({ image });
    });

    urlToFile(this.series.thumbnailUrl).then((thumbnail) => {
      this.editSeriesFormComponentStore.setThumbnail({ thumbnail });
    });
  }
}

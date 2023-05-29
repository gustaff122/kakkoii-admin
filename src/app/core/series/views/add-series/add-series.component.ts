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
import { AddSeriesComponentStore } from './add-series.component.store';
import { LoadingSpinnerComponent } from '@kakkoii/utils/loading-spinner/loading-spinner.component';
import { SeriesAgeRating } from '@kakkoii/types/series-age-rating';

@Component({
  selector: 'kk-add-series',
  templateUrl: './add-series.component.html',
  styleUrls: [ './add-series.component.scss' ],
  providers: [
    AddSeriesComponentStore,
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
export class AddSeriesComponent implements OnInit {

  public readonly loading$: Observable<boolean> = this.addSeriesComponentStore.loading$;
  public readonly thumbnail$: Observable<File | null> = this.addSeriesComponentStore.thumbnail$;
  public readonly image$: Observable<File | null> = this.addSeriesComponentStore.image$;
  public readonly notSetFiles$: Observable<boolean> = this.addSeriesComponentStore.notSetFiles$;

  public readonly tags: SeriesTags[] = seriesTagsSet;
  public readonly ageRatings: SeriesAgeRating[] = seriesAgeRatingSet;
  public form: FormGroup<SeriesForm>;

  constructor(
    @Self() private readonly addSeriesComponentStore: AddSeriesComponentStore,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.initForm();
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

  public addSeriesHandler(): void {
    if (this.form.valid) {
      let series: any = this.form.getRawValue();
      series.titlesAlt = series.titlesAlt.map((obj: any) => obj.title);

      this.addSeriesComponentStore.addSeries({ series });
    }
  }

  public selectPosterHandler(file: NgxDropzoneChangeEvent): void {
    this.addSeriesComponentStore.setThumbnail({ thumbnail: file.addedFiles[0] });
  }

  public selectImageHandler(file: NgxDropzoneChangeEvent): void {
    this.addSeriesComponentStore.setImage({ image: file.addedFiles[0] });
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
}

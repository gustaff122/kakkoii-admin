import { Component, OnInit, Self } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SeriesDatesForm, SeriesMoreForm, SeriesRestForm, SeriesTitlesForm } from '../../../../interfaces/series-form';
import { seriesTagsSet } from '../../../../data/series-tags-set';
import { SeriesTags } from '../../../../types/series-tags';
import { SeriesStatus } from '../../../../types/series-status';
import { seriesStatusSet } from '../../../../data/series-status-set';
import { SeriesAgeRating } from '../../../../types/series-age-rating';
import { seriesAgeRatingSet } from '../../../../data/series-age-rating-set';
import { SeriesAddComponentStore } from './series-add.component.store';
import { Series } from '../../../../interfaces/series';
import { NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { Observable } from 'rxjs';

@Component({
  selector: 'kk-series-add',
  templateUrl: './series-add.component.html',
  styleUrls: [ './series-add.component.scss' ],
  providers: [
    SeriesAddComponentStore,
  ],
})
export class SeriesAddComponent implements OnInit {

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
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.initForm();
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

  public addSeries(): void {
    let fixedForm: any = { ...this.formTitles.getRawValue(), ...this.formMore.getRawValue(), ...this.formDates.getRawValue(), ...this.formRest.getRawValue() };
    fixedForm.titlesAlt = fixedForm.titlesAlt.map((obj: any) => obj.title);
    let series: Series = fixedForm;

    console.log(series);
    if (this.formRest.valid) {
      this.seriesAddComponentStore.addSeries({ series });
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
      titleEn: new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(96) ]),
      titleJpRom: new FormControl(null, [ Validators.required, Validators.maxLength(96) ]),
      titleJp: new FormControl(null, [ Validators.required, Validators.maxLength(96) ]),
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
      episodeDuration: new FormControl(24, [ Validators.required ]),
      episodesCount: new FormControl(12, [ Validators.required ]),
      ageRating: new FormControl(null, [ Validators.required ]),
      status: new FormControl(null, [ Validators.required ]),
    });

    this.formRest = this.formBuilder.group<SeriesRestForm>({
      type: new FormControl(null, [ Validators.required ]),
      trailerUrl: new FormControl(null),
    });
  }


}

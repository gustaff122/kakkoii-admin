import { Component, OnInit, Self } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SeriesForm } from '../../../../interfaces/series-form';
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
  public form: FormGroup<SeriesForm>;
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
    return this.form.get('titlesAlt') as FormArray;
  }

  public addTitleAlt(): void {
    this.titlesAlt.push(this.buildTitleAlt());
  }

  public removeTitleAlt(index: number): void {
    this.titlesAlt.removeAt(index);
  }

  public addSeries(): void {
    let fixedForm: any = this.form.getRawValue();
    fixedForm.titlesAlt = fixedForm.titlesAlt.map((obj: any) => obj.title);
    let series: Series = fixedForm;
    this.seriesAddComponentStore.addSeries({ series });
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
    this.form = this.formBuilder.group<SeriesForm>({
      titleEn: new FormControl(null),
      titleJpRom: new FormControl(null),
      titleJp: new FormControl(null),
      titlesAlt: new FormArray([]),
      startDate: new FormControl(null),
      endDate: new FormControl(null),
      synopsis: new FormControl(null),
      tags: new FormControl(null),
      ageRating: new FormControl(null),
      type: new FormControl(null),
      episodeDuration: new FormControl(24),
      episodesCount: new FormControl(12),
      nsfw: new FormControl(null),
      status: new FormControl(null),
      source: new FormControl(null),
      trailerUrl: new FormControl(null),
      studio: new FormControl(null),
    });
  }
}

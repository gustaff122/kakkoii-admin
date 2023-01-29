import { SeriesAgeRating } from '../types/series-age-rating';
import { SeriesType } from '../types/series-type';
import { SeriesStatus } from '../types/series-status';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface SeriesForm {
  titleEn: FormControl<string>;
  titleJpRom: FormControl<string>;
  titleJp: FormControl<string>;
  titlesAlt: FormArray<FormGroup<{ title: FormControl<string> }>>;
  startDate: FormControl<string>;
  endDate: FormControl<string>;
  synopsis: FormControl<string>;
  trailerUrl: FormControl<string>;
  studio: FormControl<string>;
  source: FormControl<string>;
  ageRating: FormControl<SeriesAgeRating>;
  type: FormControl<SeriesType>;
  episodeDuration?: FormControl<number>;
  episodesCount?: FormControl<number>;
  nsfw: FormControl<boolean>;
  status: FormControl<SeriesStatus>;
  tags: FormControl<SeriesType[]>;
  //prequels: SeriesRelations;
  //sequels: SeriesRelations;
  //alternativeStories: SeriesRelations;
}
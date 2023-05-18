import { SeriesAgeRating } from '../types/series-age-rating';
import { SeriesType } from '../types/series-type';
import { SeriesStatus } from '../types/series-status';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { SeriesTags } from '../types/series-tags';

export interface SeriesForm {
  titleEn: FormControl<string>;
  titleJpRom: FormControl<string>;
  titleJp: FormControl<string>;
  titlesAlt: FormArray<FormGroup<{ title: FormControl<string> }>>;

  synopsis: FormControl<string>;
  studio: FormControl<string>;
  tags: FormControl<SeriesTags[]>;
  nsfw: FormControl<boolean>;
  source: FormControl<string>;

  startDate: FormControl<string>;
  endDate: FormControl<string>;
  status: FormControl<SeriesStatus>;
  episodeDuration?: FormControl<number>;
  episodesCount?: FormControl<number>;
  ageRating: FormControl<SeriesAgeRating>;

  trailerUrl: FormControl<string>;
  type: FormControl<SeriesType>;
}
import { SeriesAgeRating } from '../types/series-age-rating';
import { SeriesType } from '../types/series-type';
import { SeriesStatus } from '../types/series-status';
import { SeriesRelations } from './series-relations';
import { SeriesTags } from '../types/series-tags';

export interface Series {
  titleEn: string;
  titleJpRom: string;
  titleJp: string;
  titlesAlt?: string[];
  startDate?: string;
  endDate?: string;
  synopsis: string;
  tags: SeriesTags[];
  thumbnailUrl?: string;
  imageUrl?: string;
  trailerUrl?: string;
  ageRating: SeriesAgeRating;
  type: SeriesType;
  episodeDuration?: number;
  episodesCount?: number;
  nsfw?: boolean;
  studio?: string;
  status: SeriesStatus;
  prequels?: SeriesRelations;
  sequels?: SeriesRelations;
  alternativeStories?: SeriesRelations;
}
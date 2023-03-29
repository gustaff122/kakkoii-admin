import { SeriesAgeRating } from '../types/series-age-rating';
import { SeriesType } from '../types/series-type';
import { SeriesStatus } from '../types/series-status';
import { SeriesRelations } from './series-relations';
import { SeriesTags } from '../types/series-tags';
import { SeriesEpisode } from './series-episode';

export interface Series {
  _id: string;
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
  episodes: SeriesEpisode[];
  nsfw?: boolean;
  studio?: string;
  status: SeriesStatus;
  source: string;
  prequels?: SeriesRelations;
  sequels?: SeriesRelations;
  alternativeStories?: SeriesRelations;
}
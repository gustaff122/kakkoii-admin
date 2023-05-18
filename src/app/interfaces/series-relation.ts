import { SeriesRelationType } from '../types/series-relation-type';

export interface SeriesRelation {
  relation: SeriesRelationType;
  relatedId: string;
  titleJpRom: string;
  titleEn: string;
  thumbnailUrl: string;
  imageUrl: string;
}
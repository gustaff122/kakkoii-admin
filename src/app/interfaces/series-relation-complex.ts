import { SeriesRelationType } from '@kakkoii/types/series-relation-type';

export interface SeriesRelationComplex {
  relatedId: string;
  relatedSeries: {
    imageUrl: string;
    pseudo: string;
    thumbnailUrl: string;
    titleEn: string;
    titleJpRom: string;
    _id: string;
  };
  relation: SeriesRelationType;
}
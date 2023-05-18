import { tapResponse } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { exhaustMap, Observable, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { DefaultComponentState, DefaultComponentStore } from '@kakkoii/utils/default.component.store';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SeriesRelationType } from '@kakkoii/types/series-relation-type';
import { RelationsService } from '@kakkoii/services/relations.service';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { SeriesRelationComplex } from '@kakkoii/interfaces/series-relation-complex';

interface EditSeriesComponentState extends DefaultComponentState {
  relations: SeriesRelationComplex[];
}

@Injectable()
export class SeriesRelationsComponentStore extends DefaultComponentStore<EditSeriesComponentState> {

  public readonly relations$: Observable<SeriesRelationComplex[]> = this.select((state) => state.relations);
  public readonly hasRelations$: Observable<boolean> = this.select((state) => state.relations.length > 0);

  public readonly addRelation = this.effect((origin$: Observable<{ series1Id: string, firstRelatedToSecond: SeriesRelationType, series2Id: string, callbackFn: () => void }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ series1Id, firstRelatedToSecond, series2Id, callbackFn }) => {
        return this.relationsService.addRelation(series1Id, firstRelatedToSecond, series2Id).pipe(
          tapResponse(() => {
            this.patchState({
              loading: false,
              error: null,
            });
            this.toastrService.success('Relacja została dodana!');
            callbackFn();
          }, ({ error }: HttpErrorResponse) => {
            this.patchState({
              loading: false,
              error,
            });
          }),
        );
      }),
    );
  });

  public readonly removeRelation = this.effect((origin$: Observable<{ series1Id: string, series2Id: string, callbackFn: () => void }>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(({ series1Id, series2Id, callbackFn }) => {
        return this.relationsService.removeRelation(series1Id, series2Id).pipe(
          tapResponse(() => {
            this.patchState({
              loading: false,
              error: null,
            });
            this.toastrService.success('Relacja została usunięta!');
            callbackFn();
          }, ({ error }: HttpErrorResponse) => {
            this.patchState({
              loading: false,
              error,
            });
          }),
        );
      }),
    );
  });

  public readonly getRelationsList = this.effect((origin$: Observable<void>) => {
    return origin$.pipe(
      tap(() => {
        this.patchState({
          loading: true,
        });
      }),
      exhaustMap(() => {
        const seriesId = this.activatedRoute.snapshot.data[SERIES]._id;

        return this.relationsService.getSeriesRelations(seriesId).pipe(
          tapResponse((relations) => {
            this.patchState({
              relations,
              loading: false,
              error: null,
            });
            console.log(relations);
          }, ({ error }: HttpErrorResponse) => {
            this.patchState({
              loading: false,
              error,
            });
          }),
        );
      }),
    );
  });

  constructor(
    private readonly relationsService: RelationsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastrService: ToastrService,
  ) {
    super({
      relations: [],
      loading: false,
      error: null,
    });
  }
}
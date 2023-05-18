import { Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesRelationsComponentStore } from './series-relations.component.store';
import { SeriesAutocompleteComponent } from '@kakkoii/ui/atoms/series-autocomplete/series-autocomplete.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Series } from '@kakkoii/interfaces/series';
import { SeriesRelationType } from '@kakkoii/types/series-relation-type';
import { Observable, take } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { SeriesRelationComplex } from '@kakkoii/interfaces/series-relation-complex';
import { DeleteConfirmationModal } from '@kakkoii/ui/molecules/delete-confirmation-modal/delete-confirmation-modal.component';
import { SimpleModalService } from 'ngx-simple-modal';

interface RelationForm {
  series1: FormControl<Series>;
  firstRelatedToSecond: FormControl<SeriesRelationType>;
  series2: FormControl<Series>;
}

@Component({
  selector: 'kk-series-relations',
  templateUrl: './series-relations.component.html',
  styleUrls: [ './series-relations.component.scss' ],
  providers: [
    SeriesRelationsComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    SeriesAutocompleteComponent,
    NgSelectModule,
    ReactiveFormsModule,
    RouterLink,
  ],
})
export class SeriesRelationsComponent implements OnInit {
  public series: Series = this.activatedRoute.snapshot.data[SERIES];
  public readonly relations$: Observable<SeriesRelationComplex[]> = this.seriesRelationsComponentStore.relations$;
  public readonly loading$: Observable<boolean> = this.seriesRelationsComponentStore.loading$;
  public readonly hasRelations$: Observable<boolean> = this.seriesRelationsComponentStore.hasRelations$;

  public form: FormGroup<RelationForm>;

  public readonly relations = [
    {
      relation: 'prequel',
      label: 'jest prequelem wobec',
    },
    {
      relation: 'sequel',
      label: 'jest sequelem wobec',
    },
    {
      relation: 'alternative',
      label: 'jest historią alternatywną wobec',
    },
    {
      relation: 'other',
      label: 'jest czymś innym wobec',
    },
    {
      relation: 'remake',
      label: 'jest remakem wobec',
    },
    {
      relation: 'original',
      label: 'jest wersją oryginalną wobec',
    },
  ];

  constructor(
    @Self() private readonly seriesRelationsComponentStore: SeriesRelationsComponentStore,
    private readonly simpleModalService: SimpleModalService,
    private readonly formBuilder: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.seriesRelationsComponentStore.getRelationsList();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<RelationForm>({
      series1: new FormControl(this.series, Validators.required),
      firstRelatedToSecond: new FormControl(null, Validators.required),
      series2: new FormControl(null, Validators.required),
    });
  }

  public addRelationHandler(): void {
    this.seriesRelationsComponentStore.addRelation({
      series1Id: this.form.get('series1').value._id, firstRelatedToSecond: this.form.get('firstRelatedToSecond').value, series2Id: this.form.get('series2').value._id, callbackFn: () => {
        this.seriesRelationsComponentStore.getRelationsList();
        this.form.patchValue({
          firstRelatedToSecond: null,
          series2: null,
        });
      },
    });
  }

  public removeRelationHandler(series1Id: string, series2Id: string): void {
    this.simpleModalService.addModal(DeleteConfirmationModal, null).pipe(take(1)).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.seriesRelationsComponentStore.removeRelation({
          series1Id, series2Id, callbackFn: () => {
            this.seriesRelationsComponentStore.getRelationsList();
          },
        });
      }
    });
  }

  public trackByFn(_index: number, relation: SeriesRelationComplex): string {
    return relation.relatedId
  }
}
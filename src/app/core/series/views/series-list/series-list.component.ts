import { Component, OnDestroy, OnInit, Self } from '@angular/core';
import { debounceTime, distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { Series } from '../../../../interfaces/series';
import { SeriesListComponentStore } from './series-list.component.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { KkInputComponent } from '../../../../ui/kk-input/kk-input.component';
import { InfiniteScrollComponent } from '../../../../utils/infinite-scroll/infinite-scroll.component';
import { CommonModule } from '@angular/common';
import { SeriesAddNewButtonComponent } from '../../components/series-add-new-button/series-add-new-button.component';
import { SeriesCardComponent } from '../../components/series-card/series-card.component';

interface FiltersForm {
  name: FormControl<string>;
}

@Component({
  selector: 'kk-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: [ './series-list.component.scss' ],
  providers: [
    SeriesListComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    KkInputComponent,
    InfiniteScrollComponent,
    ReactiveFormsModule,
    SeriesAddNewButtonComponent,
    SeriesCardComponent,
  ],
})

export class SeriesListComponent implements OnInit, OnDestroy {

  public page: number = 0;
  public readonly loading$: Observable<boolean> = this.seriesListComponentStore.loading$;
  public readonly series$: Observable<Series[]> = this.seriesListComponentStore.series$;
  private subscriptions: Subscription = new Subscription();
  public form: FormGroup<FiltersForm>;

  constructor(
    @Self() private readonly seriesListComponentStore: SeriesListComponentStore,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.getSeriesFirstPage();

    this.subscriptions.add(
      this.form.get('name').valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe(() => {
        this.page = 0;
        this.getSeriesFirstPage();
      }),
    );

    this.subscriptions.add(
      this.loading$.subscribe((loading) => {
        if (loading) {
          this.form.disable({ emitEvent: false });
        } else {
          this.form.enable({ emitEvent: false });
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public getSeriesFirstPage(): void {
    this.seriesListComponentStore.getSeriesListFirstPage(this.form.getRawValue());
  }

  public getSeriesNextPage(): void {
    this.seriesListComponentStore.getSeriesListNextPage(this.form.getRawValue());
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<FiltersForm>({
      name: new FormControl(null),
    });
  }
}

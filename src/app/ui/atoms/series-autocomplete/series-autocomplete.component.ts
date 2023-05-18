import { Component, Input, OnDestroy, OnInit, Optional, Self } from '@angular/core';
import { SeriesAutocompleteComponentStore } from './series-autocomplete.component.store';
import { debounceTime, distinctUntilChanged, Observable, Subject, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { AbstractControl, FormsModule, NgControl } from '@angular/forms';
import { Series } from '@kakkoii/interfaces/series';

@Component({
  selector: 'kk-series-autocomplete',
  templateUrl: './series-autocomplete.component.html',
  styleUrls: [ './series-autocomplete.component.scss' ],
  providers: [
    SeriesAutocompleteComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
  ],
})
export class SeriesAutocompleteComponent implements OnInit, OnDestroy {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;

  public seriesInput$ = new Subject<string>();

  public isRequired: boolean = false;
  public innerValue: string | number = null;

  public touched = false;

  public readonly loading$: Observable<boolean> = this.seriesAutocompleteComponentStore.loading$;
  public readonly series$: Observable<Series[]> = this.seriesAutocompleteComponentStore.series$;
  private subscriptions: Subscription = new Subscription();

  constructor(
    @Self() private readonly seriesAutocompleteComponentStore: SeriesAutocompleteComponentStore,
    @Self() @Optional() public readonly ngControl: NgControl,
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    this.checkIfRequired();
    this.seriesAutocompleteComponentStore.getSeries({ name: '' });

    this.subscriptions.add(
      this.seriesInput$.pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe((name) => {
        this.seriesAutocompleteComponentStore.getSeries({ name });
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public onChange: any = () => {
  };

  public onTouch: any = () => {
  };

  public checkIfRequired(): void {
    if (this.ngControl.control?.validator) {
      const validator = this.ngControl.control.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  public writeValue(value: string | number | null): void {
    this.innerValue = value;
    this.registerOnTouched(!!this.onTouch);
  }

  public updateChanges(): void {
    this.onChange(this.innerValue);
  }

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}

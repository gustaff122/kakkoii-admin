import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kk-textarea',
  templateUrl: './kk-textarea.component.html',
  styleUrls: [ './kk-textarea.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class KkTextareaComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() labelBlack: boolean = false;

  public isRequired: boolean = false;
  public innerValue: string = '';

  public touched = false;

  public onChange: any = () => {
  };

  public onTouch: any = () => {
  };

  constructor(
    @Self() @Optional() public readonly ngControl: NgControl,
  ) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    this.checkIfRequired();
  }

  checkIfRequired() {
    if (this.ngControl.control?.validator) {
      const validator = this.ngControl.control.validator({} as AbstractControl);
      this.isRequired = !!(validator && validator['required']);
    }
  }

  public writeValue(value: string | null): void {
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
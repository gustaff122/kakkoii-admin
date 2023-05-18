import { Component, Input, OnInit, Optional, Self } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kk-input',
  templateUrl: './input.component.html',
  styleUrls: [ './input.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})

export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() labelBlack: boolean = false;

  public isRequired: boolean = false;
  public innerValue: string | number = null;

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

  public ngOnInit(): void {
    this.checkIfRequired();
  }

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
    if (this.type === 'number') {
      this.innerValue = parseFloat(this.innerValue as string);

      if (isNaN(this.innerValue)) {
        this.innerValue = null;
      }
    }

    this.onChange(this.innerValue);
  }

  public registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
}
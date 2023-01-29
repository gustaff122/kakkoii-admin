import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'kk-input',
  templateUrl: './kk-input.component.html',
  styleUrls: [ './kk-input.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class KkInputComponent implements ControlValueAccessor, OnInit {
  public get onTouched(): (_: any) => void {
    return this._onTouched;
  }

  public set onTouched(value: (_: any) => void) {
    this._onTouched = value;
  }

  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() label: string = '';
  @Input() labelBlack: boolean = false;

  public isRequired: boolean = false;
  public innerValue: string = '';

  constructor(
    public ngControl: NgControl,
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

  private onChange = (_: any) => {
  };

  private _onTouched = (_: any) => {
  };

  updateChanges() {
    this.onChange(this.innerValue);
  }

  writeValue(obj: any): void {
    this.innerValue = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
}

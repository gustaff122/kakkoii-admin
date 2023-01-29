import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { KkInputComponent } from '../../ui/kk-input/kk-input.component';
import { MatRippleModule } from '@angular/material/core';

interface LoginForm {
  name: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    KkInputComponent,
    MatRippleModule,
  ],
})
export class AuthComponent implements OnInit {
  public form: FormGroup<LoginForm>;

  constructor(
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<LoginForm>({
      name: new FormControl(),
      password: new FormControl(),
    });
  }
}

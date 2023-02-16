import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { KkInputComponent } from '../../ui/kk-input/kk-input.component';
import { MatRippleModule } from '@angular/material/core';
import { AuthComponentStore } from './auth.component.store';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: [ './auth.component.scss' ],
  providers: [
    AuthComponentStore,
  ],
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
    @Self() private readonly authComponentStore: AuthComponentStore,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public login(): void {
    this.authComponentStore.login(this.form.getRawValue());
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<LoginForm>({
      email: new FormControl(),
      password: new FormControl(),
    });
  }
}

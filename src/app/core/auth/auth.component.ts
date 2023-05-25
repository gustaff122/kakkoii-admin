import { Component, OnInit, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthComponentStore } from './auth.component.store';
import { InputComponent } from '@kakkoii/ui/atoms/input/input.component';
import { Observable } from 'rxjs';

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
    InputComponent,
  ],
})
export class AuthComponent implements OnInit {
  public form: FormGroup<LoginForm>;
  public readonly loading$: Observable<boolean> = this.authComponentStore.loading$;

  constructor(
    @Self() private readonly authComponentStore: AuthComponentStore,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public loginHandler(): void {
    this.authComponentStore.login(this.form.getRawValue());
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<LoginForm>({
      email: new FormControl(null, [ Validators.required ]),
      password: new FormControl(null, [ Validators.required ]),
    });
  }
}

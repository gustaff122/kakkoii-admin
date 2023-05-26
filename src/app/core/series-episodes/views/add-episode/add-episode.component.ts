import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEpisodeComponentStore } from './add-episode.component.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Series } from '@kakkoii/interfaces/series';
import { ActivatedRoute } from '@angular/router';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { InputComponent } from '@kakkoii/ui/atoms/input/input.component';
import { TextareaComponent } from '@kakkoii/ui/atoms/textarea/textarea.component';

interface EpisodeForm {
  number: FormControl<number>;
  titleEn: FormControl<string>;
  titleJp: FormControl<string>;
  titleJpRom: FormControl<string>;
  synopsis: FormControl<string>;
  aired: FormControl<string>;
  duration: FormControl<number>;
}

@Component({
  selector: 'kk-add-episode',
  templateUrl: './add-episode.component.html',
  styleUrls: [ './add-episode.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AddEpisodeComponentStore,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
  ],
  standalone: true,
})
export class AddEpisodeComponent implements OnInit {

  public readonly series: Series = this.activatedRoute.snapshot.data[SERIES];

  public form: FormGroup<EpisodeForm>;

  constructor(
    @Self() private readonly addEpisodeComponentStore: AddEpisodeComponentStore,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public addEpisodeHandler(): void {
    if (this.form.valid) {
      this.addEpisodeComponentStore.addEpisode({ episode: this.form.getRawValue() });
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<EpisodeForm>({
      number: new FormControl(null, [ Validators.required, Validators.min(1) ]),
      titleEn: new FormControl(null, [ Validators.required ]),
      titleJp: new FormControl(null, [ Validators.required ]),
      titleJpRom: new FormControl(null, [ Validators.required ]),
      synopsis: new FormControl(null, [ Validators.required ]),
      aired: new FormControl(null, [ Validators.required ]),
      duration: new FormControl(null, [ Validators.required ]),
    });
  }
}

import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditEpisodeComponentStore } from './edit-episode.component.store';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Series } from '@kakkoii/interfaces/series';
import { ActivatedRoute } from '@angular/router';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { InputComponent } from '@kakkoii/ui/atoms/input/input.component';
import { TextareaComponent } from '@kakkoii/ui/atoms/textarea/textarea.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { take } from 'rxjs';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { EPISODE } from '@kakkoii/resolvers/episode-resolver/episode.key';
import { DeleteConfirmationModal } from '@kakkoii/ui/molecules/delete-confirmation-modal/delete-confirmation-modal.component';

interface EpisodeForm {
  titleEn: FormControl<string>;
  titleJp: FormControl<string>;
  titleJpRom: FormControl<string>;
  synopsis: FormControl<string>;
  aired: FormControl<string>;
  duration: FormControl<number>;
}

@Component({
  selector: 'kk-add-episode',
  templateUrl: './edit-episode.component.html',
  styleUrls: [ './edit-episode.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EditEpisodeComponentStore,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    TextareaComponent,
  ],
  standalone: true,
})
export class EditEpisodeComponent implements OnInit {

  public readonly epNumber = this.activatedRoute.snapshot.params['epNumber'];
  public readonly series: Series = this.activatedRoute.snapshot.data[SERIES];
  public readonly episode: SeriesEpisode = this.activatedRoute.snapshot.data[EPISODE];

  public form: FormGroup<EpisodeForm>;

  constructor(
    @Self() private readonly addEpisodeComponentStore: EditEpisodeComponentStore,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
    private readonly simpleModalService: SimpleModalService,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public editEpisodeHandler(): void {
    if (this.form.valid) {
      this.addEpisodeComponentStore.editEpisode({ episode: this.form.getRawValue() });
    }
  }

  public openModalHandler(): void {
    this.simpleModalService.addModal(DeleteConfirmationModal, null).pipe(take(1)).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.addEpisodeComponentStore.deleteEpisode();
      }
    });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<EpisodeForm>({
      titleEn: new FormControl(this.episode.titleEn, [ Validators.required ]),
      titleJp: new FormControl(this.episode.titleJp, [ Validators.required ]),
      titleJpRom: new FormControl(this.episode.titleJpRom, [ Validators.required ]),
      synopsis: new FormControl(this.episode.synopsis, [ Validators.required ]),
      aired: new FormControl(this.episode.aired, [ Validators.required ]),
      duration: new FormControl(this.episode.duration, [ Validators.required ]),
    });
  }
}

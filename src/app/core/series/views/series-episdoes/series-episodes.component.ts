import { Component, OnInit, Self } from '@angular/core';
import { SeriesEpisodesComponentStore } from './series-episodes.component.store';
import { firstValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../utils/loading-spinner/loading-spinner.component';
import { SeriesEpisode } from '../../../../interfaces/series-episode';
import { MatRippleModule } from '@angular/material/core';
import { KkInputComponent } from '../../../../ui/kk-input/kk-input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { KkTextareaComponent } from '../../../../ui/kk-textarea/kk-textarea.component';
import { MatButtonModule } from '@angular/material/button';
import { Series } from '../../../../interfaces/series';
import { MatTableModule } from '@angular/material/table';
import { SeriesLink } from '../../../../interfaces/series-link';
import { SeriesEpisodeRemoveMirrorButtonComponent } from './components/series-episode-remove-mirror-button.component';

interface EpisodeForm {
  number: FormControl<number>;
  titleEn: FormControl<string>;
  titleJp: FormControl<string>;
  titleJpRom: FormControl<string>;
  synopsis: FormControl<string>;
  aired: FormControl<string>;
  duration: FormControl<number>;
}

interface MirrorForm {
  translator: FormControl<string>;
  mirror: FormControl<string>;
  url: FormControl<string>;
  date: FormControl<string>;
}

@Component({
  selector: 'kk-series',
  templateUrl: './series-episodes.component.html',
  styleUrls: [ './series-episodes.component.scss' ],
  providers: [
    SeriesEpisodesComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    MatRippleModule,
    KkInputComponent,
    ReactiveFormsModule,
    KkTextareaComponent,
    MatButtonModule,
    MatTableModule,
    SeriesEpisodeRemoveMirrorButtonComponent,
  ],
})
export class SeriesEpisodesComponent implements OnInit {

  public readonly displayedColumns: string[] = [ 'translator', 'mirror', 'date', 'action' ];

  public addEpisodeForm: FormGroup<EpisodeForm>;
  public editEpisodeForm: FormGroup<EpisodeForm>;
  public addMirrorForm: FormGroup<MirrorForm>;
  public mode: 'adding' | 'editing' | 'mirror' = 'adding';
  public wantToDelete: boolean = false;

  public readonly series$: Observable<Series> = this.seriesEpisodesComponentStore.series$;
  public readonly selectedEpisodeMirrors$: Observable<SeriesLink[]> = this.seriesEpisodesComponentStore.selectedEpisodeMirrors$;
  public readonly loading$: Observable<boolean> = this.seriesEpisodesComponentStore.loading$;
  public readonly seriesTitleJp$: Observable<string> = this.seriesEpisodesComponentStore.seriesTitleJp$;
  public readonly seriesEpisodes$: Observable<SeriesEpisode[]> = this.seriesEpisodesComponentStore.seriesEpisodes$;
  public readonly selectedEpisodeNumber$: Observable<number | null> = this.seriesEpisodesComponentStore.selectedEpisodeNumber$;

  constructor(
    @Self() private readonly seriesEpisodesComponentStore: SeriesEpisodesComponentStore,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.seriesEpisodesComponentStore.getSeries();

    this.buildForms();
  }

  public selectEpisode(selectedEpisode: number): void {
    this.wantToDelete = false;

    firstValueFrom(this.series$).then((series) => {
      const episode = series.episodes.find(e => e.number === selectedEpisode);
      this.editEpisodeForm.patchValue(episode);
    });

    this.seriesEpisodesComponentStore.selectEpisode({ selectedEpisode });
    this.mode = 'editing';
  }

  public trackByFn(_index: number, episode: SeriesEpisode): number {
    return episode.number;
  }

  public goToAddingMode(): void {
    this.mode = 'adding';
  }

  public goToMirrorsMode(): void {
    this.mode = 'mirror';
  }

  public addEpisode(): void {
    this.seriesEpisodesComponentStore.addEpisode({ episode: this.addEpisodeForm.getRawValue() });

    this.addEpisodeForm.patchValue({});
  }

  public editEpisode(): void {
    this.seriesEpisodesComponentStore.editEpisode({ episode: this.editEpisodeForm.getRawValue() });
  }

  public setWantToDelete(): void {
    this.wantToDelete = true;
  }

  public addMirror(): void {
    this.seriesEpisodesComponentStore.addMirror({ mirror: this.addMirrorForm.getRawValue() });
  }

  public deleteEpisode(): void {
    this.seriesEpisodesComponentStore.deleteEpisode({ epNumber: this.editEpisodeForm.getRawValue().number });
    this.goToAddingMode();
  }

  public deleteMirrorHandler(mirrorId: string): void {
    this.seriesEpisodesComponentStore.deleteEpisodeMirror({ mirrorId });
  }

  private buildForms(): void {
    this.addEpisodeForm = this.formBuilder.group<EpisodeForm>({
      number: new FormControl(null, [ Validators.required ]),
      titleEn: new FormControl(null),
      titleJp: new FormControl(null),
      titleJpRom: new FormControl(null),
      synopsis: new FormControl(null),
      aired: new FormControl(null),
      duration: new FormControl(null),
    });

    this.editEpisodeForm = this.formBuilder.group<EpisodeForm>({
      number: new FormControl(0, [ Validators.required ]),
      titleEn: new FormControl(null),
      titleJp: new FormControl(null),
      titleJpRom: new FormControl(null),
      synopsis: new FormControl(null),
      aired: new FormControl(null),
      duration: new FormControl(null),
    });

    this.addMirrorForm = this.formBuilder.group<MirrorForm>({
      translator: new FormControl(null, [ Validators.required ]),
      mirror: new FormControl(null, [ Validators.required ]),
      url: new FormControl(null, [ Validators.required ]),
      date: new FormControl(null, [ Validators.required ]),
    });
  }
}

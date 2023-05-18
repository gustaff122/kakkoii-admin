import { ChangeDetectionStrategy, Component, OnInit, Self } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EpisodeMirrorsComponentStore } from './episode-mirrors.component.store';
import { ActivatedRoute } from '@angular/router';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { Series } from '@kakkoii/interfaces/series';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputComponent } from '@kakkoii/ui/atoms/input/input.component';
import { SeriesLink } from '@kakkoii/interfaces/series-link';
import { Observable } from 'rxjs';
import { SeriesEpisode } from '@kakkoii/interfaces/series-episode';
import { EPISODE } from '@kakkoii/resolvers/episode-resolver/episode.key';
import { SeriesEpisodeRemoveMirrorButtonComponent } from './components/series-episode-remove-mirror-button.component';

interface MirrorForm {
  translator: FormControl<string>;
  mirror: FormControl<string>;
  url: FormControl<string>;
  date: FormControl<string>;
}

@Component({
  selector: 'kk-episode-mirrors',
  templateUrl: './episode-mirrors.component.html',
  styleUrls: [ './episode-mirrors.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    EpisodeMirrorsComponentStore,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SeriesEpisodeRemoveMirrorButtonComponent,
  ],
  standalone: true,
})
export class EpisodeMirrorsComponent implements OnInit {
  public readonly series: Series = this.activatedRoute.snapshot.data[SERIES];
  public readonly episode: SeriesEpisode = this.activatedRoute.snapshot.data[EPISODE];
  public readonly links$: Observable<SeriesLink[]> = this.episodeMirrorsComponentStore.links$;

  public form: FormGroup<MirrorForm>;

  constructor(
    @Self() private readonly episodeMirrorsComponentStore: EpisodeMirrorsComponentStore,
    private readonly activatedRoute: ActivatedRoute,
    private readonly formBuilder: FormBuilder,
  ) {
  }

  public ngOnInit(): void {
    this.buildForm();
  }

  public addMirrorHandler(): void {
    this.episodeMirrorsComponentStore.addMirror({
      mirror: this.form.getRawValue(), callbackFn: () => {
        this.form.reset();
      },
    });
  }

  public deleteMirrorHandler(mirrorId: string): void {
    this.episodeMirrorsComponentStore.deleteEpisodeMirror({ mirrorId });
  }

  private buildForm(): void {
    this.form = this.formBuilder.group<MirrorForm>({
      translator: new FormControl(null, [ Validators.required ]),
      mirror: new FormControl(null, [ Validators.required ]),
      url: new FormControl(null, [ Validators.required ]),
      date: new FormControl(null, [ Validators.required ]),
    });
  }

  public trackByFn(_index: number, link: SeriesLink): string {
    return link.id;
  }
}

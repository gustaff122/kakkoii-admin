import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { SeriesEpisodeRemoveMirrorButtonComponentStore } from './series-episode-remove-mirror-button.component.store';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from '../../../../../utils/loading-spinner/loading-spinner.component';
import { Observable } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'kk-series-episode-remove-mirror-button',
  templateUrl: './series-episode-remove-mirror-button.component.html',
  styleUrls: [ './series-episode-remove-mirror-button.component.scss' ],
  providers: [
    SeriesEpisodeRemoveMirrorButtonComponentStore,
  ],
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    MatIconModule,
    MatButtonModule,
  ],
})
export class SeriesEpisodeRemoveMirrorButtonComponent {

  @Output() public readonly deleted: EventEmitter<void> = new EventEmitter<void>();

  @Input() public epNumber: number;
  @Input() public mirrorId: string;


  public readonly loading$: Observable<boolean> = this.seriesEpisodeRemoveMirrorButtonComponentStore.loading$;

  public wantToDelete: boolean = false;

  constructor(
    @Self() private readonly seriesEpisodeRemoveMirrorButtonComponentStore: SeriesEpisodeRemoveMirrorButtonComponentStore,
  ) {
  }

  public deleteMirror(): void {
    this.seriesEpisodeRemoveMirrorButtonComponentStore.deleteMirror({
      epNumber: this.epNumber, mirrorId: this.mirrorId, callbackFn: () => {
        this.deleted.emit();
      },
    });
  }

  public changeWantToDelete(): void {
    this.wantToDelete = true;
  }

}

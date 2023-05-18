import { Component, EventEmitter, Input, Output, Self } from '@angular/core';
import { SeriesEpisodeRemoveMirrorButtonComponentStore } from './series-episode-remove-mirror-button.component.store';
import { CommonModule } from '@angular/common';
import { Observable, take } from 'rxjs';
import { LoadingSpinnerComponent } from '@kakkoii/utils/loading-spinner/loading-spinner.component';
import { SimpleModalService } from 'ngx-simple-modal';
import { DeleteConfirmationModal } from '@kakkoii/ui/molecules/delete-confirmation-modal/delete-confirmation-modal.component';

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
  ],
})
export class SeriesEpisodeRemoveMirrorButtonComponent {

  @Output() public readonly deleted: EventEmitter<string> = new EventEmitter<string>();

  @Input() public epNumber: number;
  @Input() public mirrorId: string;

  public readonly loading$: Observable<boolean> = this.seriesEpisodeRemoveMirrorButtonComponentStore.loading$;

  constructor(
    @Self() private readonly seriesEpisodeRemoveMirrorButtonComponentStore: SeriesEpisodeRemoveMirrorButtonComponentStore,
    private readonly simpleModalService: SimpleModalService,
  ) {
  }

  public deleteMirrorHandler(): void {
    this.simpleModalService.addModal(DeleteConfirmationModal, null).pipe(take(1)).subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.seriesEpisodeRemoveMirrorButtonComponentStore.deleteMirror({
          epNumber: this.epNumber, mirrorId: this.mirrorId, callbackFn: () => {
            this.deleted.emit(this.mirrorId);
          },
        });
      }
    });
  }
}

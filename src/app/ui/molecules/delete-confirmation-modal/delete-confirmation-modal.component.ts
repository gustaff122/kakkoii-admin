import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { RouterLink } from '@angular/router';

export interface EpisodeDeleteModalData {
}

@Component({
  selector: 'kk-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: [ './delete-confirmation-modal-component.scss' ],
  standalone: true,
  imports: [
    RouterLink,
  ],
})
export class DeleteConfirmationModal extends SimpleModalComponent<EpisodeDeleteModalData, boolean> implements EpisodeDeleteModalData {

  constructor() {
    super();
  }

  public confirm(): void {
    this.result = true;
    this.close();
  }

  public closeHandler(): void {
    this.result = false;
    this.close();
  }
}
import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { RouterLink } from '@angular/router';

export interface EpisodeManageModalData {
  pseudo: string;
  epNumber: number;
}

@Component({
  selector: 'kk-episode-manage-modal',
  templateUrl: './episode-manage-modal.component.html',
  styleUrls: [ './episode-manage-modal-component.scss' ],
  standalone: true,
  imports: [
    RouterLink,
  ],
})
export class EpisodeManageModal extends SimpleModalComponent<EpisodeManageModalData, null> implements EpisodeManageModalData {
  public pseudo: string;
  public epNumber: number;

  constructor() {
    super();
  }

  public closeHandler(): void {
    this.close();
  }
}
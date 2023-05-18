import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { RouterLink } from '@angular/router';

export interface SeriesModalData {
  titleEn: string;
  pseudo: string;
}

@Component({
  selector: 'kk-series-modal',
  templateUrl: './series-modal.component.html',
  styleUrls: [ './series-modal-component.scss' ],
  standalone: true,
  imports: [
    RouterLink,
  ],
})
export class SeriesModal extends SimpleModalComponent<SeriesModalData, null> implements SeriesModalData {
  public titleEn: string;
  public pseudo: string;

  constructor() {
    super();
  }

  public closeHandler(): void {
    this.close();
  }
}
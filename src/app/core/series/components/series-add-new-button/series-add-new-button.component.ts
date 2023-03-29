import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'kk-series-add-new-button',
  templateUrl: './series-add-new-button.component.html',
  styleUrls: [ './series-add-new-button.component.scss' ],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatRippleModule,
    RouterLink,
  ],
})
export class SeriesAddNewButtonComponent {

}

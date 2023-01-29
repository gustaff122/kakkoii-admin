import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesRoutingComponent } from './series-routing.component';
import { SeriesRoutingModule } from './series-routing.module';
import { SeriesListComponent } from './views/series-list/series-list.component';
import { SeriesCardComponent } from './components/series-card/series-card.component';
import { MatIconModule } from '@angular/material/icon';
import { SeriesAddNewButtonComponent } from './components/series-add-new-button/series-add-new-button.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { SeriesAddComponent } from './views/series-add/series-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KkInputComponent } from '../../ui/kk-input/kk-input.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    SeriesRoutingComponent,
    SeriesListComponent,
    SeriesCardComponent,
    SeriesAddNewButtonComponent,
    SeriesAddComponent,
  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    MatIconModule,
    MatButtonModule,
    MatRippleModule,
    FormsModule,
    ReactiveFormsModule,
    KkInputComponent,
    NgSelectModule,
    NgxDropzoneModule,
  ],
})
export class SeriesModule {
}

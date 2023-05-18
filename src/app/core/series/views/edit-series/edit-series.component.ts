import { Component } from '@angular/core';
import { EditSeriesFormComponent } from './edit-series-form/edit-series-form.component';
import { SeriesRelationsComponent } from './series-relations/series-relations.component';

@Component({
  selector: 'kk-edit-series',
  templateUrl: './edit-series.component.html',
  styleUrls: [ './edit-series.component.scss' ],
  standalone: true,
  imports: [
    EditSeriesFormComponent,
    SeriesRelationsComponent,
  ],
})
export class EditSeriesComponent {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesRoutingComponent } from './series-routing.component';
import { SeriesRoutingModule } from './series-routing.module';

@NgModule({
  declarations: [
    SeriesRoutingComponent,

  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
  ],
})
export class SeriesModule {
}

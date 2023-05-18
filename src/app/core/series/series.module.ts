import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeriesRoutingComponent } from './series-routing.component';
import { SeriesRoutingModule } from './series-routing.module';
import { NavbarComponent } from '@kakkoii/ui/organisms/navbar/navbar.component';

@NgModule({
  declarations: [
    SeriesRoutingComponent,

  ],
  imports: [
    CommonModule,
    SeriesRoutingModule,
    NavbarComponent,
  ],
})
export class SeriesModule {
}

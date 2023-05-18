import { NgModule } from '@angular/core';
import { SeriesEpisodesRoutingComponent } from './series-episodes-routing.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeriesEpisodesRoutingModule } from './series-episodes-routing.module';
import { NavbarComponent } from '@kakkoii/ui/organisms/navbar/navbar.component';

@NgModule({
  declarations: [
    SeriesEpisodesRoutingComponent,
  ],
  imports: [
    CommonModule,
    SeriesEpisodesRoutingModule,
    RouterModule,
    NavbarComponent,
  ],
})
export class SeriesEpisodesModule {
}
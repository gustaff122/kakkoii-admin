import { NgModule } from '@angular/core';
import { SeriesBrowserRoutingComponent } from './series-browser-routing.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SeriesBrowserRoutingModule } from './series-browser-routing.module';
import { NavbarComponent } from '@kakkoii/ui/organisms/navbar/navbar.component';

@NgModule({
  declarations: [
    SeriesBrowserRoutingComponent,
  ],
  imports: [
    CommonModule,
    SeriesBrowserRoutingModule,
    RouterModule,
    NavbarComponent,
  ],
})
export class SeriesBrowserModule {
}
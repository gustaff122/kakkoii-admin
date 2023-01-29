import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesRoutingComponent } from './series-routing.component';
import { SeriesListComponent } from './views/series-list/series-list.component';
import { SeriesAddComponent } from './views/series-add/series-add.component';

const routes: Routes = [
  {
    path: '',
    component: SeriesRoutingComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: SeriesListComponent,
      },
      {
        path: 'add',
        component: SeriesAddComponent,
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SeriesRoutingModule {
}

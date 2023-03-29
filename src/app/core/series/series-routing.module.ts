import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesRoutingComponent } from './series-routing.component';
import { SeriesListComponent } from './views/series-list/series-list.component';
import { SeriesAddComponent } from './views/series-add/series-add.component';
import { SeriesEpisodesComponent } from './views/series-episdoes/series-episodes.component';

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
      {
        path: 'edit/:id',
        component: SeriesAddComponent,
      },
      {
        path: 'episodes/:id',
        component: SeriesEpisodesComponent,
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

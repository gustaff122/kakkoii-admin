import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesRoutingComponent } from './series-routing.component';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { seriesResolver } from '@kakkoii/resolvers/series-resolver/series.resolver';
import { seriesExistsGuard } from '@kakkoii/guards/series-exists.guard';

const routes: Routes = [
  {
    path: '',
    component: SeriesRoutingComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/browser',
      },
      {
        path: 'add',
        loadComponent: () => import('./views/add-series/add-series.component').then(c => c.AddSeriesComponent),
      },
      {
        path: ':seriesPseudo/edit',
        loadComponent: () => import('./views/edit-series/edit-series.component').then(c => c.EditSeriesComponent),
        canActivate: [ seriesExistsGuard ],
        resolve: {
          [SERIES]: seriesResolver,
        },
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

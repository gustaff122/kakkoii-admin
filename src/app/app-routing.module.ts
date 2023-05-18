import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loggedOutGuard } from '@kakkoii/guards/logged-out.guard';
import { loggedInGuard } from '@kakkoii/guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    canMatch: [ loggedOutGuard ],
    loadComponent: () => import('./core/auth/auth.component').then(c => c.AuthComponent),
  },
  {
    path: 'browser',
    canMatch: [ loggedInGuard ],
    loadChildren: () => import('./core/series-browser/series-browser.module').then(m => m.SeriesBrowserModule),
  },
  {
    path: 'series',
    canMatch: [ loggedInGuard ],
    loadChildren: () => import('./core/series/series.module').then(m => m.SeriesModule),
  },
  {
    path: 'episodes',
    canMatch: [ loggedInGuard ],
    loadChildren: () => import('./core/series-episodes/series-episodes.module').then(m => m.SeriesEpisodesModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}

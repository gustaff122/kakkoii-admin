import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedOutGuard } from './guards/logged-out.guard';
import { LoggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth',
  },
  {
    path: 'auth',
    canMatch: [ LoggedOutGuard ],
    loadComponent: () => import('./core/auth/auth.component').then(m => m.AuthComponent),
  },
  {
    path: 'series',
    canLoad: [ LoggedInGuard ],
    loadChildren: () => import('./core/series/series.module').then(m => m.SeriesModule),
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
})
export class AppRoutingModule {
}

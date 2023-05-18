import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesEpisodesRoutingComponent } from './series-episodes-routing.component';
import { seriesExistsGuard } from '@kakkoii/guards/series-exists.guard';
import { SERIES } from '@kakkoii/resolvers/series-resolver/series.key';
import { seriesResolver } from '@kakkoii/resolvers/series-resolver/series.resolver';
import { episodeAvailableGuard } from '@kakkoii/guards/episode-available.guard';
import { EPISODE } from '@kakkoii/resolvers/episode-resolver/episode.key';
import { episodeResolver } from '@kakkoii/resolvers/episode-resolver/episode.resolver';

const routes: Routes = [
  {
    path: '',
    component: SeriesEpisodesRoutingComponent,
    children: [
      {
        path: ':seriesPseudo',
        canActivate: [ seriesExistsGuard ],
        resolve: {
          [SERIES]: seriesResolver,
        },
        loadComponent: () => import('./views/episodes-list/episodes-list.component').then(c => c.EpisodesListComponent),
      },
      {
        path: ':seriesPseudo/add',
        loadComponent: () => import('./views/add-episode/add-episode.component').then(c => c.AddEpisodeComponent),
        canActivate: [ seriesExistsGuard ],
        resolve: {
          [SERIES]: seriesResolver,
        },
      },
      {
        path: ':seriesPseudo/edit/:epNumber',
        loadComponent: () => import('./views/edit-episode/edit-episode.component').then(c => c.EditEpisodeComponent),
        canActivate: [ seriesExistsGuard, episodeAvailableGuard ],
        resolve: {
          [SERIES]: seriesResolver,
          [EPISODE]: episodeResolver,
        },
      },
      {
        path: ':seriesPseudo/mirrors/:epNumber',
        loadComponent: () => import('./views/episode-mirrors/episode-mirrors.component').then(c => c.EpisodeMirrorsComponent),
        canActivate: [ seriesExistsGuard, episodeAvailableGuard ],
        resolve: {
          [SERIES]: seriesResolver,
          [EPISODE]: episodeResolver,
        },
      },
      {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class SeriesEpisodesRoutingModule {
}
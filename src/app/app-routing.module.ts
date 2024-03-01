import { Inject, NgModule } from '@angular/core';
import {
  ROUTES,
  RouterModule,
  Routes,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'music/search',
    redirectTo: 'music',
    pathMatch: 'full',
  },
  {
    path: 'playlists',
    providers: [],
    loadChildren: () => import('./playlists/playlists.module'),
  },
  {
    path: 'music',
    providers: [],
    loadChildren: () => import('./music/music-routing.module'),
  },
  {
    path: '**',
    redirectTo: 'playlists',
    pathMatch: 'full',
  },
];

export default routes;
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MusicComponent } from './music.component';
import { AlbumSearchViewComponent } from './containers/album-search-view/album-search-view.component';
import { AlbumDetailViewComponent } from './containers/album-detail-view/album-detail-view.component';

const routes: Routes = [
  {
    path: /* music/.. */ '',
    providers: [],
    component: MusicComponent,
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        component: AlbumSearchViewComponent,
      },
      {
        path: 'albums/:albumId',
        component: AlbumDetailViewComponent,
      },
    ],
  },
];

export default routes;

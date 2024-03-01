import { NgModule, forwardRef, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
  provideRouter,
  withComponentInputBinding,
} from '@angular/router';
import { MusicComponent } from './music.component';
import { AlbumSearchViewComponent } from './containers/album-search-view/album-search-view.component';
import { AlbumDetailViewComponent } from './containers/album-detail-view/album-detail-view.component';
import { MusicAPIService } from '../core/services/music-api.service';
import { withRequestsMadeViaParent } from '@angular/common/http';

export const resolveAlbum = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const albumId = route.paramMap.get('albumId');
  const api = inject(MusicAPIService);

  if (!albumId) {
    throw new Error('No album ID');
  }

  return api.getAlbumById(albumId);
};

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
        data: { title: 'Album' },
        providers: [],
        resolve: {
          album: resolveAlbum,
        },
        component: AlbumDetailViewComponent,
      },
    ],
  },
];

export default routes;

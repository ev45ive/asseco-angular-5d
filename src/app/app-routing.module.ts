import { Inject, NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'music/search',
    redirectTo: 'music',
    pathMatch: 'full',
  },
  {
    path: 'playlists',
    loadChildren: () => import('./playlists/playlists.module'),
  },
  {
    path: 'music',
    loadChildren: () => import('./music/music.module'),
  },
  {
    path: '**',
    redirectTo: 'playlists',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(@Inject(ROUTES) private routes: Routes[]) {}
}

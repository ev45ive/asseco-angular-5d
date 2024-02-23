import { Inject, NgModule } from '@angular/core';
import { ROUTES, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'playlists',
    pathMatch: 'full', // match full length
  },
  {
    path: 'playlists',
    loadChildren: () => import('./playlists/playlists.module'), //.then((m) => m.PlaylistsModule),
  },
  {
    path: '**',
    // component: PageNotFound // TODO
    redirectTo: 'playlists',
    pathMatch: 'full', // match full length
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(@Inject(ROUTES) private routes: Routes[]) {}
}

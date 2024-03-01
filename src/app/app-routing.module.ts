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

@NgModule({
  imports: [
    // RouterModule.forRoot(routes, {
    //   // useHash: true, // useHistory pushState or Hash
    // }),
  ],
  exports: [RouterModule],
  providers: [provideRouter(routes)],
})
export class AppRoutingModule {
  // constructor(@Inject(ROUTES) private routes: Routes[]) {}
}

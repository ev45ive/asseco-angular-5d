import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistsViewComponent } from './containers/playlists-view/playlists-view.component';

const routes: Routes = [
  {
    path: /* playlists/... */ '',
    component: PlaylistsComponent,
    children: [
      {
        path: '',
        redirectTo: 'mine',
        pathMatch: 'full',
      },
      {
        path: 'mine',
        component: PlaylistsViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistsRoutingModule {}

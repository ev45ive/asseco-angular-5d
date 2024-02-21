import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistsViewComponent } from './containers/playlists-view/playlists-view.component';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';
import { PlaylistListComponent } from './components/playlist-list/playlist-list.component';

const routes: Routes = [
  {
    path: /* playlists/... */ '',
    component: PlaylistsComponent,
    children: [
      {
        path: '',
        component: PlaylistsViewComponent,
      },
      // {
      //   path: 'a',
      //   component: PlaylistDetailComponent,
      // },
      // {
      //   path: 'b',
      //   component: PlaylistListComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaylistsRoutingModule {}

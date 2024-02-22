import { Component } from '@angular/core';
import { PlaylistsViewComponent } from '../../containers/playlists-view/playlists-view.component';
import { AppComponent } from '../../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.scss',
})
export class PlaylistListComponent {
  select() {
    // TODO:
  }

  constructor(private parent: PlaylistsViewComponent,
    private app: AppComponent,
    private rotuer: Router
  ){
    debugger
  };
}

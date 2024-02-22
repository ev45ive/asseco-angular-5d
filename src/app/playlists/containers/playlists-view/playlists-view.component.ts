import { Component, ViewChild } from '@angular/core';
import { PlaylistListComponent } from '../../components/playlist-list/playlist-list.component';

@Component({
  selector: 'app-playlists-view',
  templateUrl: './playlists-view.component.html',
  styleUrl: './playlists-view.component.scss',
})
export class PlaylistsViewComponent {
  mode: 'details' | 'editor' = 'details';

  showDetails() {
    this.mode = 'details';
  }

  showEditor() {
    this.mode = 'editor';

    // this.list?.select()
  }

  // @ViewChild('listRef', { read: PlaylistListComponent })
  @ViewChild(PlaylistListComponent)
  list?: PlaylistListComponent;

  // comparator(param: string) {
  //   return this.mode == param;
  // }
}

import { Component } from '@angular/core';
import { mockPlaylists } from '../../components/playlist-list/mockPlaylists';
import { Playlist } from '../../components/playlist-list/Playlist';

@Component({
  selector: 'app-playlists-view',
  templateUrl: './playlists-view.component.html',
  styleUrl: './playlists-view.component.scss',
})
export class PlaylistsViewComponent {
  mode: 'details' | 'editor' = 'details';

  playlistsData = mockPlaylists;
  selected = mockPlaylists[0];
  selectedId = '234';

  selectPlaylistById(id: string) {
    this.selectedId = id;
    this.selected = this.playlistsData.find((p) => p.id === id)!;
  }

  showDetails() {
    this.mode = 'details';
  }

  showEditor() {
    this.mode = 'editor';
  }

  savePlaylist(draft: Playlist) {
    console.log('Saving...', draft);
  }

}

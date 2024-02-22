import { Component, ViewChild } from '@angular/core';
import { PlaylistListComponent } from '../../components/playlist-list/playlist-list.component';
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
  selected = mockPlaylists[0]; // <=== add selected playlist
  selectedId = '234';

  // Example!
  selectPlaylistById(id: string) {
    this.selectedId = id;
    this.selected = this.playlistsData.find((p) => p.id === id)!;
  }

  // TODO: Connect to button!
  showDetails() {
    this.mode = 'details';
  }

  // TODO: Connect to button!
  showEditor() {
    this.mode = 'editor';
  }

  // TODO: Connect to button!
  savePlaylist(draft: Playlist) {
    console.log('Saving...', draft);
  }
}

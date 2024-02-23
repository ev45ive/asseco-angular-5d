import { Component, ViewChild } from '@angular/core';
import { mockPlaylists } from '../../components/playlist-list/mockPlaylists';
import { Playlist } from '../../components/playlist-list/Playlist';
import { PlaylistEditorComponent } from '../../components/playlist-editor/playlist-editor.component';

@Component({
  selector: 'app-playlists-view',
  templateUrl: './playlists-view.component.html',
  styleUrl: './playlists-view.component.scss',
})
export class PlaylistsViewComponent {
  mode: 'details' | 'editor' | 'creator' = 'details';

  playlistsData = mockPlaylists;
  // selected: Playlist | undefined = mockPlaylists[0];
  selected?: Playlist  //= mockPlaylists[0];
  selectedId = '234';

  selectPlaylistById(id: string) {
    this.selectedId = id;
    this.selected = this.playlistsData.find((p) => p.id === id);
  }

  showDetails() {
    this.mode = 'details';
  }

  showEditor() {
    this.mode = 'editor';
  }

  showCreator() {
    this.mode = 'creator';
  }

  createPlaylist(draft: Playlist) {
    console.log('Adding new playlist...', draft);
    draft.id = crypto.randomUUID();
  }

  savePlaylist(draft: Playlist) {
    console.log('Saving...', draft);
    this.selected = draft;
    this.playlistsData = this.playlistsData.map((p) =>
      p.id === draft.id ? draft : p,
    );
    this.showDetails();
  }

  @ViewChild(PlaylistEditorComponent)
  editor?: PlaylistEditorComponent;
}

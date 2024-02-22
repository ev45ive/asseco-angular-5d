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
  mode: 'details' | 'editor' = 'details';

  playlistsData = mockPlaylists;
  selected = mockPlaylists[0];
  selectedId = '234';

  selectPlaylistById(id: string) {
    if (this.editor?.hasUnsavedChanges) return;
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
    this.selected = draft;

    const index = this.playlistsData.findIndex((p) => p.id === draft.id);
    this.playlistsData.splice(index, 1, draft);
    
    this.showDetails();
  }

  @ViewChild(PlaylistEditorComponent)
  editor?: PlaylistEditorComponent;
}

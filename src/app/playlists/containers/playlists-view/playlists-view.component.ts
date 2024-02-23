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
  selected = mockPlaylists[0];
  selectedId = '234';

  selectPlaylistById(id: string) {
    this.selectedId = id;
    // const selected = this.playlistsData.find((p) => p.id === id) as any // !!!
    // selected.get.me.a.million.dollars.now(id)

    // const selected = this.playlistsData.find((p) => p.id === id) as Playlist // cast 
    // const selected = this.playlistsData.find((p) => p.id === id)! // non-null assertion

    const selected = this.playlistsData.find((p) => p.id === id);

    // Type-Narrowing
    if (selected !== undefined) { // nullcheck
      this.selected = selected; // Playlist | undefined
    }
    else if (selected === undefined) {
      selected; // undefined
    } 
    else {
      selected satisfies never; // never
      throw new Error('Unsuported playlist type')
    }
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

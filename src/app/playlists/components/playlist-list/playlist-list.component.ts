import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { mockPlaylists } from './mockPlaylists';
import { Playlist } from './Playlist';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.scss',
})
export class PlaylistListComponent {

  @Input('items') playlists: Playlist[] = [];
  
  selectedId = '';

  select(id: string) {
    this.selectedId = id;

    // this.playlists.push(123)
    // this.playlists[0].id
  }
}

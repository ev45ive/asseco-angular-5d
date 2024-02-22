import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { mockPlaylists } from './mockPlaylists';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.scss',
})
export class PlaylistListComponent {
  playlists = mockPlaylists;
  selectedId = '234';

  select(id: string) {
    this.selectedId = id;
  }
}

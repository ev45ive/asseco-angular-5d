import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { mockPlaylists } from './mockPlaylists';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.scss',
})
export class PlaylistListComponent {
  playlists = []; // never[]
  selectedId = '';

  select(id: string) {
    this.selectedId = id;

    // this.playlists.push(123)
    // this.playlists[0].id
  }
}

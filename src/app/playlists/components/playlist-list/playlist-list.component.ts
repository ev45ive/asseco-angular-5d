import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockPlaylists } from './mockPlaylists';
import { Playlist } from './Playlist';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.scss',
})
export class PlaylistListComponent {
  @Input({ alias: 'items', required: true})  playlists!: Playlist[] 

  @Output() selectedIdChange = new EventEmitter<string>();

  selectedId = '';

  select(id: string) {
    this.selectedId = id;
  }
}

// export class PlaylistSelectedEvent{
//   static name = 'Playlist Selected'
//   constructor(readonly id:string){}
// }
// new PlaylistSelectedEvent('123')

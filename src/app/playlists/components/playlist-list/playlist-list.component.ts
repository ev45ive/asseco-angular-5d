import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { mockPlaylists } from './mockPlaylists';
import { Playlist } from './Playlist';

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.scss',
  
  // ☊ d[-_-]b + template events + onChanges IMMUTABLE!
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class PlaylistListComponent {
  // oldValue === newValue

  @Input({ alias: 'items', required: true })
  playlists: Playlist[] = [];
  
  @Output() selectedIdChange = new EventEmitter<string>();

  selectedId = '';

  select(id: string) {
    this.selectedId = id;
    this.selectedIdChange.emit(id)
  }
}

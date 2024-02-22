import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Playlist } from '../playlist-list/Playlist';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss',
})
export class PlaylistDetailComponent {
  
  @Input({ required: true }) playlist!: Playlist;

  // @Output() edit = new EventEmitter<void>();
  @Output() edit = new EventEmitter<Playlist['id']>();

  // editClick(){
  //   debugger
  //   this.edit.emit()
  // }

  getClasses = () => ({
    isPublic: this.playlist.public,
    isPrivate: !this.playlist.public,
  });
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.component.html',
  styleUrl: './playlist-detail.component.scss',
})
export class PlaylistDetailComponent {
  
  playlist = {
    id: '123',
    name: 'Playlist 123',
    public: false,
    description: 'Awesome playlist',
  };
}

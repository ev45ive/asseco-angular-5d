import { Component } from '@angular/core';

@Component({
  selector: 'app-playlists-view',
  templateUrl: './playlists-view.component.html',
  styleUrl: './playlists-view.component.scss',
})
export class PlaylistsViewComponent {
  mode: 'details' | 'editor' = 'details';

  showDetails() {
    this.mode = 'details';
  }
  
  showEditor() {
    this.mode = 'editor';
  }
}

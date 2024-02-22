import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

@Component({
  selector: 'app-playlist-editor',
  templateUrl: './playlist-editor.component.html',
  styleUrl: './playlist-editor.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush // ☊ d[-_-]b
})
export class PlaylistEditorComponent {
  playlist = {
    id: '123',
    name: 'Playlist 123',
    public: true,
    description: 'Awesome playlist',
  };

  // @ViewChild('movieplayer')
  // movieplayer?: ElementRef<HTMLVideoElement>;
  
  // ngAfterViewInit() {
  //   this.movieplayer.focus();
  // }
}

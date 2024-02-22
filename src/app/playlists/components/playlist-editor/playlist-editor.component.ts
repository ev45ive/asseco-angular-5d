import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  signal,
} from '@angular/core';
import { Playlist } from '../playlist-list/Playlist';

@Component({
  selector: 'app-playlist-editor',
  templateUrl: './playlist-editor.component.html',
  styleUrl: './playlist-editor.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush // ☊ d[-_-]b
})
export class PlaylistEditorComponent {
  @Input({ required: true }) playlist!: Playlist;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Playlist>();

  submit() {
    this.save.emit(this.playlist);
  }

  @ViewChild('playlistNameRef')
  inputRef?: ElementRef<HTMLInputElement>;

  ngAfterViewInit() {
    this.inputRef?.nativeElement.focus();
  }
}

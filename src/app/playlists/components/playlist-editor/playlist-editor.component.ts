import {
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Playlist } from '../playlist-list/Playlist';

@Component({
  selector: 'app-playlist-editor',
  templateUrl: './playlist-editor.component.html',
  styleUrl: './playlist-editor.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush // ☊ d[-_-]b
})
export class PlaylistEditorComponent {
  // @Input({ required: true }) playlist!: Playlist;

  _playlist!: Playlist;

  @Input({ required: true }) set playlist(playlist: Playlist) {
    this._playlist = playlist; // original
    this.draft = { ...playlist }; // copy
  }

  draft!: Playlist;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Playlist>();

  hasUnsavedChanges = true;

  constructor() {}

  submit() {
    this.save.emit(this.draft);
  }
}

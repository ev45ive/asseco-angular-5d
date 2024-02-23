import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Playlist } from '../playlist-list/Playlist';
import { NgForm, NgModel } from '@angular/forms';

const EMPTY_PLAYLIST = {
  id: '',
  name: '',
  public: false,
  description: '',
};

@Component({
  selector: 'app-playlist-editor',
  templateUrl: './playlist-editor.component.html',
  styleUrl: './playlist-editor.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush // ☊ d[-_-]b
})
export class PlaylistEditorComponent {
  @Input() playlist?: Playlist = EMPTY_PLAYLIST;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Playlist>();

  hasUnsavedChanges = true;

  constructor() {}

  submit() {
    const draft = {
      // id: this.playlist.id,
      ...this.playlist,
      ...this.formRef?.value,
    };

    this.save.emit(draft);
  }

  @ViewChild('formRef', { read: NgForm })
  formRef?: NgForm;

  @ViewChild('playlistNameModelRef', { read: NgModel })
  playlistNameModelRef?: NgModel;
}

// ng.getDirectives($('form'))
// ng.getDirectives($('ngModel'))

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
export class PlaylistEditorComponent /* implements OnInit, DoCheck, AfterViewInit, OnDestroy */ {
  
  // @Input({ required: true }) playlist!: Playlist;

  @Input({ required: true }) set playlist(playlist: Playlist) {
    this.draft = { ...playlist };
  }

  draft!: Playlist;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Playlist>();

  hasUnsavedChanges = true;
  // @Output() isDirty = new EventEmitter<boolean>();

  constructor() {}

  // ngOnChanges(changes: SimpleChanges): void {
  //   // console.log('ngOnChanges', changes);
  //   this.draft = { ...this.playlist }; // Shallow Copy!
  // }

  submit() {
    this.save.emit(this.draft);
  }
}

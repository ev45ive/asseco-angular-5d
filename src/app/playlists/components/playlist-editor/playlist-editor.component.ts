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
  @Input({ required: true }) playlist!: Playlist;

  draft!: Playlist;

  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Playlist>();
  hasUnsavedChanges = true;
  // @Output() isDirty = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {
    console.log('ngOnInit');
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges', changes);
    this.draft = { ...this.playlist }; // Shallow Copy!
  }
  ngDoCheck(): void {
    console.log('ngDoCheck');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy');
  }

  submit() {
    this.save.emit(this.draft);
  }

  // @ViewChild('playlistNameRef')
  // inputRef?: ElementRef<HTMLInputElement>;

  // ngAfterViewInit() {
  //   this.inputRef?.nativeElement.focus();
  // }
}

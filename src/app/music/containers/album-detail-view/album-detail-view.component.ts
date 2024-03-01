import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  afterRender,
  inject,
  viewChild,
} from '@angular/core';
import { AlbumCardComponent } from '../../components/album-card/album-card.component';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs';
import { MusicAPIService } from '../../../core/services/music-api.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { AlbumResponse, Track } from '../../../core/model/Album';

@Component({
  selector: 'app-album-detail-view',
  standalone: true,
  imports: [AlbumCardComponent, DatePipe, AsyncPipe],
  templateUrl: './album-detail-view.component.html',
  styleUrl: './album-detail-view.component.scss',
})
export class AlbumDetailViewComponent {
  // album = inject(ActivatedRoute).snapshot.data['album'];

  @Input() albumId?: string;
  @Input() title?: string;
  @Input() album?: AlbumResponse;

  selectedTrack?: Track;
  @ViewChild('audioRef')
  audioRef?: ElementRef<HTMLAudioElement>;
  // audioRef = viewChild<ElementRef<HTMLAudioElement>>('audioRef');

  play(track: Track) {
    this.selectedTrack = track;
    setTimeout(() => this.audioRef?.nativeElement.play());
  }
}

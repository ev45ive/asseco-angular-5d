import {
  Component,
  ElementRef,
  ViewChild,
  afterRender,
  inject,
  viewChild,
} from '@angular/core';
import { AlbumCardComponent } from '../../components/album-card/album-card.component';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { MusicAPIService } from '../../../core/services/music-api.service';
import { AsyncPipe, DatePipe } from '@angular/common';
import { Track } from '../../../core/model/Album';

@Component({
  selector: 'app-album-detail-view',
  standalone: true,
  imports: [AlbumCardComponent, DatePipe, AsyncPipe],
  templateUrl: './album-detail-view.component.html',
  styleUrl: './album-detail-view.component.scss',
})
export class AlbumDetailViewComponent {
  selectedTrack?: Track;

  // audioRef = viewChild<ElementRef<HTMLAudioElement>>('audioRef');

  @ViewChild('audioRef')
  audioRef?: ElementRef<HTMLAudioElement>;

  play(track: Track) {
    this.selectedTrack = track;
    setTimeout(() => this.audioRef?.nativeElement.play());

    // Only in injection context
    // afterRender(() => this.audioRef?.nativeElement.play());
  }

  route = inject(ActivatedRoute);
  albumId = this.route.paramMap.pipe(
    map((pm) => pm.get('albumId')),
    filter(Boolean),
  );

  // make API request
  api = inject(MusicAPIService);
  album = this.albumId.pipe(switchMap((id) => this.api.getAlbumById(id)));
}

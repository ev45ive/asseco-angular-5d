import { Component, inject } from '@angular/core';
import { AlbumCardComponent } from '../../components/album-card/album-card.component';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { MusicAPIService } from '../../../core/services/music-api.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-album-detail-view',
  standalone: true,
  imports: [AlbumCardComponent, DatePipe, AsyncPipe],
  templateUrl: './album-detail-view.component.html',
  styleUrl: './album-detail-view.component.scss',
})
export class AlbumDetailViewComponent {
  route = inject(ActivatedRoute);
  albumId = this.route.paramMap.pipe(
    map((pm) => pm.get('albumId')),
    filter(Boolean),
  );

  // make API request
  api = inject(MusicAPIService);
  album = this.albumId.pipe(switchMap((id) => this.api.getAlbumById(id)));
}

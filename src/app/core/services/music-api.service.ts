import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlbumSearchResponse } from '../model/Album';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIService {
  http = inject(HttpClient);

  search(query = '') {
    return this.http
      .get<AlbumSearchResponse>('search', {
        params: {
          query,
          type: 'album',
        },
        // transferCache:{} // SSR Data transfer
      })
      .pipe(map((res) => res.albums.items));
  }
}

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlbumResponse, AlbumSearchResponse } from '../model/Album';
import { map, share } from 'rxjs';
import { Playlist } from '../../playlists/components/playlist-list/Playlist';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIService {
  http = inject(HttpClient);

  searchAlbums(query = '') {
    return this.http
      .get<AlbumSearchResponse>('search', {
        params: {
          query,
          type: 'album',
        },
      })
      .pipe(map((res) => res.albums.items));
  }

  getAlbumById(id = '') {
    return this.http.get<AlbumResponse>('albums/' + id, {});
  }

  getPlaylistById(id = '') {
    return this.http.get<Playlist>('playlists/' + id, {});
  }
}

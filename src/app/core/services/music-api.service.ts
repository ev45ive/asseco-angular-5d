import { Injectable, inject } from '@angular/core';
import mockAlbums from '../mocks/mockAlbums';
import { API_URL } from '../tokens';
import { HttpClient } from '@angular/common/http';
import { AlbumResponse } from '../model/Album';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIService {
  api_url = inject(API_URL);
  http = inject(HttpClient);

  search(query = '') {
    console.log('Searching.... ', this.api_url, query);

    return this.http.get<AlbumResponse[]>(this.api_url + 'search', {
      headers: {},
      params: {
        query,
        type: 'album',
      },
    });
  }
}

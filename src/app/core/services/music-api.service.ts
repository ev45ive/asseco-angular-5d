import { Injectable, inject } from '@angular/core';
import mockAlbums from '../mocks/mockAlbums';
import { API_URL } from '../tokens';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIService {
  api_url = inject(API_URL);
  http = inject(HttpClient);

  search(query = '') {
    console.log('Searching.... ', this.api_url, query);

    // Unicast Observable - RECIPE
    const obs = this.http.get(this.api_url + 'search', {
      headers: {
        // auth
      },
      params: {
        query,
        type: 'album',
      },
      // reportProgress: true -- stream of events, next.. next.. complete!
    });

    // Start Cooking from Recipe!
    obs.subscribe(console.log);

    obs.subscribe({
      next: (res) => console.log(res),
      error: (error) => console.log(error),
      complete: () => console.log('complete'), /// ??
    });

    return mockAlbums;
  }
}

import { Injectable, inject } from '@angular/core';
import mockAlbums from '../mocks/mockAlbums';
import { API_URL } from '../tokens';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIService {
  // api_url = environment.api_url

  // constructor(@Inject(API_URL) private api_url:string) {}

  api_url = inject(API_URL);

  search(query = '') {
    console.log('Searching.... ', query);

    return mockAlbums;
  }
}

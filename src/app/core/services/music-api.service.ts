import { Injectable } from '@angular/core';
import mockAlbums from '../mocks/mockAlbums';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIService {

  api_url = environment.api_url

  constructor() {}

  search(query = '') {
    console.log('Searching.... ', query);

    return mockAlbums;
  }
}

import { Injectable } from '@angular/core';
import mockAlbums from '../mocks/mockAlbums';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIService {
  constructor() {}

  search(query = '') {
    console.log('Searching.... ', query);

    return mockAlbums;
  }
}

import { TestBed } from '@angular/core/testing';

import { MusicAPIService } from './music-api.service';

describe('MusicAPIService', () => {
  let service: MusicAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

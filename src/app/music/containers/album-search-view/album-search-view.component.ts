import { Component, PLATFORM_ID, inject } from '@angular/core';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { ResultsGridComponent } from '../../components/results-grid/results-grid.component';
import { MusicAPIService } from '../../../core/services/music-api.service';
import { Album } from '../../../core/model/Album';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { concatMap, filter, map, mergeAll, mergeMap, switchMap } from 'rxjs';

@Component({
  selector: 'app-album-search-view',
  templateUrl: './album-search-view.component.html',
  styleUrl: './album-search-view.component.scss',
  standalone: true,
  imports: [SearchFormComponent, ResultsGridComponent],
})
export class AlbumSearchViewComponent {
  api = inject(MusicAPIService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  pid = inject(PLATFORM_ID);

  query: string | null = '';
  message = '';
  results: Album[] = [];

  ngOnInit(): void {
    if (isPlatformServer(this.pid)) return;

    const queryChanges = this.route.queryParamMap.pipe(
      map((pm) => pm.get('q') || ''),
    );
    queryChanges.subscribe((q) => (this.query = q));

    queryChanges
      .pipe(
        // mergeMap((query) => this.api.search(query)), // all as they come  // merge
        // concatMap((query) => this.api.search(query)), // all in order  // concat
        switchMap((query) => this.api.search(query)), // only latest // debounce
        // exhaustMap((query) => this.api.search(query)), // one at the time // throttle

        //   (obs) => obs, // Observable<Observable<AlbumResponse[]>>
        //   mergeAll(),
        //   (obs) => obs, // Observable<AlbumResponse[]>
      )
      .subscribe({
        next: (albums) => (this.results = albums),
        error: (error) => (this.message = error.message),
      });
  }

  searchAlbums(query = '') {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
    });
  }
}

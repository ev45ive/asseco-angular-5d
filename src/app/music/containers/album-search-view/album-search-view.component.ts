import {
  Component,
  DestroyRef,
  EventEmitter,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { ResultsGridComponent } from '../../components/results-grid/results-grid.component';
import { MusicAPIService } from '../../../core/services/music-api.service';
import { Album, AlbumResponse } from '../../../core/model/Album';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import {
  EMPTY,
  Observable,
  Subject,
  Subscription,
  catchError,
  concatMap,
  filter,
  map,
  mergeAll,
  mergeMap,
  switchMap,
  takeUntil,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationsService } from '../../../core/services/notifications.service';

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

  // onDestory$ = new Subject();
  // d = inject(DestroyRef).onDestroy(() => this.onDestory$.next(null));

  queryChanges = this.route.queryParamMap.pipe(
    // takeUntil(this.onDestory$),
    takeUntilDestroyed(),
    map((pm) => pm.get('q')),
    filter(Boolean),
  );

  searchChanges = this.queryChanges.pipe(
    switchMap((query) => this.api.search(query)),
  );

  ngOnInit(): void {
    if (isPlatformServer(this.pid)) return;

    this.queryChanges.subscribe((q) => (this.query = q));
    this.searchChanges.subscribe((albums) => (this.results = albums));
  }

  searchAlbums(query = '') {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
    });
  }
}

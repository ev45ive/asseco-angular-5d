import {
  Component,
  DestroyRef,
  EventEmitter,
  OnDestroy,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { ResultsGridComponent } from '../../components/results-grid/results-grid.component';
import { MusicAPIService } from '../../../core/services/music-api.service';
import { Album, AlbumResponse } from '../../../core/model/Album';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgIf, isPlatformServer } from '@angular/common';
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
  share,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NotificationsService } from '../../../core/services/notifications.service';

@Component({
  selector: 'app-album-search-view',
  templateUrl: './album-search-view.component.html',
  styleUrl: './album-search-view.component.scss',
  standalone: true,
  imports: [SearchFormComponent, NgIf, AsyncPipe, ResultsGridComponent],
})
export class AlbumSearchViewComponent {
  // Navigation
  route = inject(ActivatedRoute);
  queryChanges = this.route.queryParamMap.pipe(
    map((pm) => pm.get('q')),
    filter(Boolean),
  );

  // API
  api = inject(MusicAPIService);
  searchChanges = this.queryChanges.pipe(
    switchMap((query) => this.api.searchAlbums(query)),
    share(),
  );

  // Search Form
  router = inject(Router);
  searchAlbums(query = '') {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
    });
  }
}

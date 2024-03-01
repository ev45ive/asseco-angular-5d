import { Component, PLATFORM_ID, inject } from '@angular/core';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { ResultsGridComponent } from '../../components/results-grid/results-grid.component';
import { MusicAPIService } from '../../../core/services/music-api.service';
import { Album } from '../../../core/model/Album';
import { ActivatedRoute, Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { filter, map } from 'rxjs';

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
    // this.route.snapshot.paramMap
    if (isPlatformServer(this.pid)) return;

    // this.query = this.route.snapshot.queryParamMap.get('q');
    // if (this.query) this.searchAlbums(this.query);

    this.route.queryParamMap
      .pipe(
        map((pm) => pm.get('q') || ''),
        // filter( q => q !== null)
      )
      .subscribe((q) => (this.query = q));
  }

  searchAlbums(query = '') {
    // this.router.navigate(['/music','search'])
    // this.router.navigate(['..','search'], {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { q: query },
    });

    this.api.search(query).subscribe({
      next: (albums) => (this.results = albums),
      error: (error) => (this.message = error.message),
    });
  }
}

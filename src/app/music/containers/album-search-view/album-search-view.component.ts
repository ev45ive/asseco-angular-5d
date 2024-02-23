import { Component, inject } from '@angular/core';
import { SearchFormComponent } from '../../components/search-form/search-form.component';
import { ResultsGridComponent } from '../../components/results-grid/results-grid.component';
import { MusicAPIService } from '../../../core/services/music-api.service';
import { Album } from '../../../core/model/Album';

@Component({
  selector: 'app-album-search-view',
  templateUrl: './album-search-view.component.html',
  styleUrl: './album-search-view.component.scss',
  standalone: true,
  imports: [SearchFormComponent, ResultsGridComponent],
})
export class AlbumSearchViewComponent {
  api = inject(MusicAPIService);
  results: Album[] = [];
  message = ''

  searchAlbums(query = '') {

    this.api.search(query).subscribe({
      next: (res) => (this.results = res),
      error: (error) => this.message = (error.error.error.message),
      // complete: () => console.log('complete'),
    });
  }
}

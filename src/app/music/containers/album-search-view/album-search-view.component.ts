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

  searchAlbums(query = '') {
    this.results = this.api.search(query);
  }
  
  // ngOnInit(): void {
  //   // FIXME: To tylko na chfile!
  //   this.searchAlbums('batman');
  // }
}

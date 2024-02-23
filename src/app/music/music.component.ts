import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AlbumSearchViewComponent } from './containers/album-search-view/album-search-view.component';

@Component({
  selector: 'app-music',
  standalone: true,
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss',
  imports: [RouterOutlet, AlbumSearchViewComponent],
})
export class MusicComponent {}

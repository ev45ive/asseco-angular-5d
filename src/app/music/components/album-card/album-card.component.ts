import { Component, Input } from '@angular/core';
import { Album } from '../../../core/model/Album';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [NgOptimizedImage, RouterLink],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
})
export class AlbumCardComponent {
  // @Input() album?: Album
  @Input({ required: true }) album!: Album;
}

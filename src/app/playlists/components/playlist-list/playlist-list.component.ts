import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

NgFor;

@Component({
  selector: 'app-playlist-list',
  templateUrl: './playlist-list.component.html',
  styleUrl: './playlist-list.component.scss',
})
export class PlaylistListComponent {
  playlists = [
    {
      id: '123',
      name: 'Playlist 123',
      public: false,
      description: 'Best playlist',
    },
    {
      id: '234',
      name: 'Playlist 234',
      public: true,
      description: 'Cool playlist',
    },
    {
      id: '345',
      name: 'Playlist 345',
      public: false,
      description: 'Awesome playlist',
    },
  ];

  trackById(index: number, p: { id: string }) {
    return p.id;
  }

  ngOnInit() {
    setInterval(() => {
      // this.playlists.push( this.playlists.shift() !)
      const first = { ...this.playlists.shift()! };
      this.playlists = [...this.playlists, first];
    }, 1000);
  }
}

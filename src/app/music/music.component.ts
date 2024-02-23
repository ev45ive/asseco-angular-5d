import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrl: './music.component.scss',
})
export class MusicComponent {}

// SCAM - Single Component Angular Module
// @NgModule({
//   declarations: [MusicComponent],
//   exports: [MusicComponent],
//   imports:[ AlbumCardComponentModule, SharedModule ]
// })
// export class MusicComponentModule {}

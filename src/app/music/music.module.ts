import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MusicRoutingModule } from './music-routing.module';
import { MusicComponent } from './music.component';
import { AlbumSearchViewComponent } from './containers/album-search-view/album-search-view.component';

@NgModule({
  imports: [
    MusicComponent,
    AlbumSearchViewComponent,
    CommonModule,
    MusicRoutingModule,
  ],
})
export class MusicModule {}

export default MusicModule;

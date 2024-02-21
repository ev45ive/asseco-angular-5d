import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaylistsRoutingModule } from './playlists-routing.module';
import { PlaylistsComponent } from './playlists.component';
import { PlaylistsViewComponent } from './containers/playlists-view/playlists-view.component';
import { PlaylistListComponent } from './components/playlist-list/playlist-list.component';
import { PlaylistDetailComponent } from './components/playlist-detail/playlist-detail.component';
import { PlaylistEditorComponent } from './components/playlist-editor/playlist-editor.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PlaylistsComponent,
    PlaylistsViewComponent,
    PlaylistListComponent,
    PlaylistDetailComponent,
    PlaylistEditorComponent
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule,
    
    // Exports available only in declarations ^
    SharedModule
  ]
})
export class PlaylistsModule { }

export default PlaylistsModule
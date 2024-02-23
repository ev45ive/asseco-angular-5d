import { Component, Input } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { AlbumCardComponent } from "../album-card/album-card.component";
import { Album } from '../../../core/model/Album';

@Component({
    selector: 'app-results-grid',
    standalone: true,
    templateUrl: './results-grid.component.html',
    styleUrl: './results-grid.component.scss',
    imports: [SharedModule, AlbumCardComponent]
})
export class ResultsGridComponent {

    @Input() results: Album[] = [];
}

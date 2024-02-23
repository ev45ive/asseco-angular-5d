import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-results-grid',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './results-grid.component.html',
  styleUrl: './results-grid.component.scss',
})
export class ResultsGridComponent {}

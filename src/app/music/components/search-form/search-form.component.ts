import { Component, EventEmitter, Output } from '@angular/core';
import { AlbumSearchViewComponent } from '../../containers/album-search-view/album-search-view.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { SharedModule } from '../../../shared/shared.module';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [FormsModule, SharedModule, ReactiveFormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.scss',
})
export class SearchFormComponent {
  @Output() search = new EventEmitter<string>();

  query = '';
  showAdvanced = false;

  searchForm = new FormGroup({
    query: new FormControl('batman', { nonNullable: true }),
    advanced: new FormGroup({
      type: new FormControl('album'),
      markets: new FormArray([
        new FormGroup({
          code: new FormControl('PL'),
        }),
      ]),
    }),
  });

  constructor() {
    const field = this.searchForm.get('query')!;
    const valueChanges = field.valueChanges;

    const searchChanges = valueChanges.pipe(
      // minimum 3 characters length
      filter((q) => q.length >= 3),

      // no duplicates
      distinctUntilChanged(/* (a, b) => a == b */),

      // wait for 500ms silence
      debounceTime(500)
    );

    searchChanges.subscribe(console.log);
  }

  markets = this.searchForm.get(['advanced', 'markets']) as FormArray<
    FormGroup<{
      code: FormControl<string | null>;
    }>
  >;

  addMarket() {
    this.markets.push(
      new FormGroup({
        code: new FormControl(''),
      }),
    );
  }

  submit() {
    this.search.emit(this.query);
  }
}

import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AlbumSearchViewComponent } from '../../containers/album-search-view/album-search-view.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  NonNullableFormBuilder,
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

  // builder = inject(FormBuilder);
  builder = inject(NonNullableFormBuilder);

  searchForm = this.createForm();

  constructor() {
    const field = this.searchForm.get('query')!;
    const valueChanges = field.valueChanges;

    const searchChanges = valueChanges.pipe(
      // wait for 500ms silence
      debounceTime(500),

      // minimum 3 characters length
      filter((q) => q.length >= 3),

      // no duplicates
      distinctUntilChanged(/* (a, b) => a == b */),
    );

    // Multicast Subject Chaining:
    searchChanges.subscribe(this.search);
  }

  markets = this.searchForm.get(['advanced', 'markets']) as FormArray<
    FormGroup<{
      code: FormControl<string | null>;
    }>
  >;

  private createForm() {
    const _ = this.builder;
    return _.group({
      query: _.control('batman'/* , { nonNullable: true } */),
      advanced: _.group({
        type: ['album'],
        markets: _.array([
          _.group({
            code: ['PL'],
          }),
        ]),
      }),
    });
  }

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

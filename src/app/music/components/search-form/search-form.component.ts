import { Component, EventEmitter, Output, inject } from '@angular/core';
import { AlbumSearchViewComponent } from '../../containers/album-search-view/album-search-view.component';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NgModel,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
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

  badword = 'batman';

  censor = (control: AbstractControl<any, any>): ValidationErrors | null => {
    if (this.badword && String(control.value).includes(this.badword)) {
      return {
        censor: { badword: this.badword },
      };
    }
    return null;
  };

  query = '';
  showAdvanced = false;

  // builder = inject(FormBuilder);
  builder = inject(NonNullableFormBuilder);

  searchForm = this.createForm();

  constructor() {
    const field = this.searchForm.get('query')!;
    const valueChanges = field.valueChanges;

    // this.searchForm.value.advanced?.markets?.[0]?.code // Strong Types!

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
      query: _.control('', {
        validators: [Validators.required, Validators.minLength(3), this.censor],
      }),
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

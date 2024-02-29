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
import {
  Observable,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  withLatestFrom,
} from 'rxjs';

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

  censor = (
    control: AbstractControl<any, any>,
  ): Observable<ValidationErrors | null> => {
    return new Observable<ValidationErrors | null>((observer) => {
      const handler = setTimeout(() => {
        if (this.badword && String(control.value).includes(this.badword)) {
          observer.next({
            censor: { badword: this.badword },
          });
        } else observer.next(null);

        observer.complete();
      }, 1500);

      return () => clearTimeout(handler);
    });
  };

  query = '';
  showAdvanced = false;

  // builder = inject(FormBuilder);
  builder = inject(NonNullableFormBuilder);

  searchForm = this.createForm();

  constructor() {
    const field = this.searchForm.get('query')!;
    const valueChanges = field.valueChanges;
    const statusChanges = field.statusChanges;

    const validValues = statusChanges.pipe(
      withLatestFrom(valueChanges),
      filter(([status, value]) => status === 'VALID'),
      map(([status, value]) => value),
    );

    const searchChanges = validValues.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    );

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
        validators: [Validators.required, Validators.minLength(3)],
        asyncValidators: [this.censor],
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

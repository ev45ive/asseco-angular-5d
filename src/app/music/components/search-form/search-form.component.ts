import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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

  @Input() set query(q: string | null) {
    this.searchForm.get('query')?.setValue(q || '',{
      // emitEvent: false 
    });
  }

  showAdvanced = false;

  builder = inject(NonNullableFormBuilder);
  searchForm = this.createForm();

  queryField = this.searchForm.get('query')!;

  validValues = this.queryField.statusChanges.pipe(
    withLatestFrom(this.queryField.valueChanges),
    filter(([status, value]) => status === 'VALID'),
    map(([status, value]) => value),
  );

  searchChanges = this.validValues.pipe(
    debounceTime(500),
    distinctUntilChanged(),
  );

  ngOnInit(): void {
    this.searchChanges.subscribe(this.search);
    // valueChanges.subscribe(console.log)
    // statusChanges.subscribe(console.log)
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
    this.search.emit(this.queryField.value);
  }
}

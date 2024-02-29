import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[contenteditable][ngModel], [formControl][ngModel]', // Compile-time only / static
  standalone: true, // I am NgModule! I go to imports!,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ContenteditableDirective,
      multi: true,
    },
  ],
})
export class ContenteditableDirective implements ControlValueAccessor {
  // constructor(private elem: ElementRef<HTMLElement>) {}

  // [innerHTML]="zmienna"
  @HostBinding('innerHTML')
  value = '';

  // (input)="fn"
  @HostListener('input', ['$event.target.innerHTML'])
  updateModelFn?: Function;

  @HostListener('blur')
  touchedFn?: Function;

  // [style.background]="zmienna"
  @HostBinding('disabled')
  @HostBinding('class.bg-body-tertiary')
  isDisabled = false;

  @HostBinding('contentEditable')
  get contentEditable() {
    return this.isDisabled ? 'false' : 'true';
  }

  ngAfterContentInit(): void {
    // this.elem;
  }

  writeValue(modelValue: any): void {
    this.value = modelValue;
  }

  registerOnChange(updateModelFn: any): void {
    this.updateModelFn = updateModelFn;
  }

  registerOnTouched(fn: any): void {
    this.touchedFn = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}

// Dependency Inversion - Easy testing / Maintenance
// const d = new ContenteditableDirective();
// d.writeValue('test');
// d.setDisabledState(true);
// d.isDisabled == true;
// d.updateModelFn?.('test');
// d.value == '123';

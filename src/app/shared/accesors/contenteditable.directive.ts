import { Directive, ElementRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[contenteditable][ngModel]',
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
  constructor(private elem: ElementRef<HTMLElement>) {}

  ngAfterContentInit(): void {
    this.elem;
  }

  writeValue(modelValue: any): void {
    // Watch for XSS !
    this.elem.nativeElement.innerHTML = modelValue;
  }

  registerOnChange(updateModel: any): void {
    this.elem.nativeElement.addEventListener('input', (e) =>
      updateModel(this.elem.nativeElement.innerHTML),
    );
  }

  registerOnTouched(fn: any): void {
    this.elem.nativeElement.addEventListener('blur', (e) => fn());
  }

  setDisabledState?(isDisabled: boolean): void {
    this.elem.nativeElement.contentEditable = isDisabled ? 'false' : 'true';
    this.elem.nativeElement.style.background = isDisabled ? '#eee' : '#fff';
  }
}

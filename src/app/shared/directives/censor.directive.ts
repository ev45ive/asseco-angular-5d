import { Directive, ElementRef, Host, Input, Optional } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  NgForm,
  NgModel,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Directive({
  selector: '[appCensor][ngModel]',
  providers: [
    {
      provide: NG_VALIDATORS, // InjectionToken<readonly (Function | Validator)[]>
      useExisting: CensorDirective,
      multi: true, // Many Instances for one provider (..)[]
    },
  ],
})
export class CensorDirective implements Validator {
  @Input('appCensor') set appCensor(badword: string | null) {
    this.badword = badword;
    this.onChanged?.();
  }

  badword: string | null = null;

  constructor(
    private elem: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    @Optional() @Host() private form: NgForm,
    // private model: NgModel, // FIX: Reverse Control - let Model As Us!
  ) {}

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    if (this.badword && String(control.value).includes(this.badword)) {
      return {
        censor: { badword: this.badword },
      };
    }
    return null;
  }

  // Tell Model to revalidate because badword changed!
  onChanged?: Function;
  registerOnValidatorChange?(fn: () => void): void {
    this.onChanged = fn;
  }
}

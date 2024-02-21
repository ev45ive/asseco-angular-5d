import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesno',
})
export class YesnoPipe implements PipeTransform {
  transform(value: boolean, yes = 'Yes', no = 'No'): string {
    return value ? yes : no;
  }
}

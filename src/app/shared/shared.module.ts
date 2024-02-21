import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesnoPipe } from './pipes/yesno.pipe';



@NgModule({
  declarations: [
    YesnoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    YesnoPipe
  ]
})
export class SharedModule { }

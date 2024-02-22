import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YesnoPipe } from './pipes/yesno.pipe';
import { ClockComponent } from './components/clock/clock.component';



@NgModule({
  declarations: [
    YesnoPipe,
    ClockComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CommonModule,
    YesnoPipe,
    ClockComponent
  ]
})
export class SharedModule { }

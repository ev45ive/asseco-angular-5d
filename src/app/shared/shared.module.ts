import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { YesnoPipe } from './pipes/yesno.pipe';
import { ClockComponent } from './components/clock/clock.component';



@NgModule({
  declarations: [
    YesnoPipe,
    ClockComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
  exports: [
    NgOptimizedImage,
    CommonModule,
    YesnoPipe,
    ClockComponent
  ]
})
export class SharedModule { }

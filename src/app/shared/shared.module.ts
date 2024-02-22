import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { YesnoPipe } from './pipes/yesno.pipe';
import { ClockComponent } from './components/clock/clock.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    YesnoPipe,
    ClockComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
  ],
  exports: [
    NgOptimizedImage,
    FormsModule,
    CommonModule,
    YesnoPipe,
    ClockComponent
  ]
})
export class SharedModule { }

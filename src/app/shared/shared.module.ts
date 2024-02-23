import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { YesnoPipe } from './pipes/yesno.pipe';
import { ClockComponent } from './components/clock/clock.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './layout/navigation/navigation.component';



@NgModule({
  declarations: [
    YesnoPipe,
    ClockComponent,
    NavigationComponent
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
    ClockComponent,
    NavigationComponent
  ]
})
export class SharedModule { }

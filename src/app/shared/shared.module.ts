import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { YesnoPipe } from './pipes/yesno.pipe';
import { ClockComponent } from './components/clock/clock.component';
import { FormsModule } from '@angular/forms';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { CensorDirective } from './directives/censor.directive';



@NgModule({
  declarations: [
    YesnoPipe,
    ClockComponent,
    NavigationComponent,
    CensorDirective
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
    NavigationComponent,
    CensorDirective
  ]
})
export class SharedModule { }

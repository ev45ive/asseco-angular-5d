import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-clock',
  styleUrl: './clock.component.scss',
  // templateUrl: './clock.component.html',
  template: `<span>Time: {{ time }}</span>`,
  // changeDetection: ChangeDetectionStrategy.OnPush // ☊ d[-_-]b
})
export class ClockComponent {
  time = new Date().toLocaleTimeString();

  constructor(
    @Inject(PLATFORM_ID) private pid: object,
    readonly cdr: ChangeDetectorRef
  ) {
    cdr.detach();
  }

  ngOnInit(): void {
    this.cdr.detectChanges();

    if (isPlatformServer(this.pid)) return;

    /* NG0506: Angular hydration expected the ApplicationRef.isStable() to emit `true`, but it didn't happen within 10000ms. Angular hydration logic depends on the application becoming stable as a signal to complete hydration process. Find more at https://angular.io/errors/NG0506 */
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
      // this.cdr.detectChanges();
    }, 1_000);
  }
}

import { isPlatformServer } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  NgZone,
  PLATFORM_ID,
} from '@angular/core';

@Component({
  selector: 'app-clock',
  styleUrl: './clock.component.scss',
  // templateUrl: './clock.component.html',
  template: `<span>Time: {{ time }}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush, // ☊ d[-_-]b
})
export class ClockComponent {
  time = new Date().toLocaleTimeString();

  constructor(
    @Inject(PLATFORM_ID) private pid: object,
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {
    // cdr.detach();
  }

  ngOnInit(): void {
    // this.cdr.detectChanges();

    // if (isPlatformServer(this.pid)) return;

    // don't do ApplicationRef.tick()
    this.zone.runOutsideAngular(() => {
      setInterval(() => {
        this.time = new Date().toLocaleTimeString();
        this.cdr.detectChanges();
      }, 1_000);
    });
    /* NG0506: Angular hydration expected the ApplicationRef.isStable() to emit `true`, but it didn't happen within 10000ms. Angular hydration logic depends on the application becoming stable as a signal to complete hydration process. Find more at https://angular.io/errors/NG0506 */
  }
}

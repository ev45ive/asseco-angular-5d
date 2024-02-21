import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'app-clock',
  styleUrl: './clock.component.scss',
  // templateUrl: './clock.component.html',
  template: `<span>Time: {{ time }}</span>`,
  // changeDetection: ChangeDetectionStrategy.OnPush // ☊ d[-_-]b
})
export class ClockComponent {
  time = new Date().toLocaleTimeString();

  constructor(readonly cdr: ChangeDetectorRef) {
    cdr.detach();
  }

  ngOnInit(): void {
    this.cdr.detectChanges();
    
    setInterval(() => {
      this.time = new Date().toLocaleTimeString();
      this.cdr.detectChanges();
    }, 1_000);
  }
}

import { Component, inject } from '@angular/core';
import {
  Notification,
  NotificationsService,
} from '../../services/notifications.service';
import { scan, tap } from 'rxjs';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  service = inject(NotificationsService);

  notifications: Notification[] = [
    // { message: 'test', name: 'Notification' },
    // { message: 'error', name: 'Error' },
  ];

  dismiss(n: Notification) {
    this.service.dismiss(n);
  }

  ngOnInit(): void {
    this.service.notificationDismissed.subscribe((dismissed) => {
      this.notifications = this.notifications.filter((n) => n !== dismissed);
    });

    this.service.notificationChanges
      .pipe(
        // tap(console.log),
        scan((ns, n) => [...ns, n], this.notifications),
      )
      .subscribe((n) => (this.notifications = n));
  }
}

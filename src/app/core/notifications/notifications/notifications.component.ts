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
    { message: 'test', name: 'Notification' },
    { message: 'error', name: 'Error' },
  ];

  ngOnInit(): void {
    this.service.notificationChanges
      .pipe(
        // tap(console.log),
        scan((ns, n) => [...ns, n], this.notifications),
      )
      .subscribe((n) => (this.notifications = n));
  }
}

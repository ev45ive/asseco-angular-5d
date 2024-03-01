import { Component, inject } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  service = inject(NotificationsService);

  notifications = [
    { message: 'test', name: '' },
    { message: 'error', name: 'Error' },
  ];

  ngOnInit(): void {
    
    this.service.notificationChanges.subscribe(n => {
      // this.notifications = n ???
    })
  }
}

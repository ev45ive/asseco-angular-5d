import { Component } from '@angular/core';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  notifications = [
    { message: 'test', name: '' },
    { message: 'error', name: 'Error' },
  ];
}

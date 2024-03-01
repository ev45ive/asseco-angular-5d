import { EventEmitter, Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

interface Notification {
  type: 'notification' | 'error';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notificationChanges = new EventEmitter<Notification>();

  constructor() {}

  notify(message: string) {}

  error({ message }: Error) {
    this.notificationChanges.next({
      type: 'notification',
      message,
    });
    return EMPTY;
  }
}

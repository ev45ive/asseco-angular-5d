import { EventEmitter, Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';

export interface Notification {
  name: 'Notification' | 'Error';
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notificationChanges = new EventEmitter<Notification>();

  constructor() {}

  notify(message: string) {
    this.notificationChanges.next({
      name: 'Notification',
      message,
    });
  }

  error({ message }: Error) {
    this.notificationChanges.next({
      name: 'Error',
      message,
    });
    return EMPTY;
  }
}

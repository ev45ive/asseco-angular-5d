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
  notificationDismissed = new EventEmitter<Notification>();

  constructor() {
    this.notificationChanges.subscribe((n) => {
      setTimeout(() => {
        this.notificationDismissed.next(n);
      }, 2000);
    });
  }

  dismiss(n: Notification) {
    this.notificationDismissed.next(n);
  }

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

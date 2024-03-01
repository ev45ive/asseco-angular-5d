import { EventEmitter, Injectable } from '@angular/core';
import { EMPTY, delayWhen, timer } from 'rxjs';

export interface Notification {
  name: 'Notification' | 'Error';
  message: string;
  timeout?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  notificationChanges = new EventEmitter<Notification>();
  notificationDismissed = new EventEmitter<Notification>();

  constructor() {
    this.notificationChanges
      .pipe(delayWhen((n) => timer(n.timeout || 2000)))
      .subscribe(this.notificationDismissed);
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

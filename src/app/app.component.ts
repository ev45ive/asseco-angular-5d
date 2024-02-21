import { Component } from '@angular/core';

@Component({
  selector: 'app-root, .placki[sos=malinowy]',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'asseco';

  login(){
    this.title = 'Admin'
  }
}

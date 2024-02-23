import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../../environments/environment';
import { API_URL } from './tokens';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
  ],
})
export class CoreModule {}

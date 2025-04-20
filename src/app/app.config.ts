import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(),importProvidersFrom(ToastrModule.forRoot({
       positionClass: 'toast-bottom-right', // Change position here
        timeOut: 3000, // Optional: Set timeout for toast messages
        preventDuplicates: true
  })), importProvidersFrom(BrowserAnimationsModule),importProvidersFrom(NoopAnimationsModule),provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration()]
};

import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldControl } from '@angular/material/form-field';
import { provideHttpClient, withFetch } from '@angular/common/http';
import {provideNativeDateAdapter} from '@angular/material/core';
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideHttpClient(withFetch()), provideNativeDateAdapter()]
};

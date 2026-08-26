import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { getFirebaseApp } from '@pulso-shell/auth-data-access';

getFirebaseApp();

bootstrapApplication(App, appConfig)
  .then(() => {
    document.getElementById('preboot-loader')?.remove();
  })
  .catch((err) => console.error(err));

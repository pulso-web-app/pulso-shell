import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { getFirebaseApp } from './app/core/firebase/firebase';

getFirebaseApp();

bootstrapApplication(App, appConfig)
  .then(() => {
    document.getElementById('preboot-loader')?.remove();
  })
  .catch((err) => console.error(err));

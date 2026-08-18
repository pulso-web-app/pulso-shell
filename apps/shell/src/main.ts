import { initFederation } from '@angular-architects/native-federation';

import { environment } from './environments/environment';

initFederation(environment.federationManifest)
  .then(() => import('./bootstrap'))
  .catch((err) => {
    console.error('Failed to initialize Native Federation:', err);
  });

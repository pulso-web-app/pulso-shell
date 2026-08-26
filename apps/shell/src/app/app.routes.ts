import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

import { authGuard, guestGuard } from '@pulso-shell/auth-data-access';
import {
  PULSO_DEFAULT_REMOTE,
  PULSO_REMOTES,
} from '@pulso-shell/shell-feature';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: PULSO_DEFAULT_REMOTE,
  },

  {
    path: 'login',
    canActivate: [guestGuard],
    title: 'Login',
    loadComponent: () =>
      import('@pulso-shell/auth-feature').then(
        (module) => module.LoginComponent,
      ),
  },

  ...PULSO_REMOTES.map((remote) => ({
    path: remote.path,
    title: remote.title,
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule(remote.key, './Routes').then(
        (module) => module.REMOTE_ROUTES,
      ),
  })),
];

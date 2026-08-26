import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

import { authGuard, guestGuard } from '@pulso-shell/auth-data-access';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'crm',
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

  {
    path: 'crm',
    title: 'CRM',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule('crm', './Routes').then((module) => module.CRM_ROUTES),
  },

  {
    path: 'projects',
    title: 'Projects',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule('projects', './Routes').then(
        (module) => module.PROJECTS_ROUTES,
      ),
  },
];

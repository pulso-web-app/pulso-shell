import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

import { authGuard } from './core/auth/auth.guard';
import { guestGuard } from './core/auth/guest.guard';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'crm',
  },

  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (module) => module.LoginComponent,
      ),
  },

  {
    path: 'crm',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule('crm', './Routes').then(
        (module) => module.CRM_ROUTES,
      ),
  },

  {
    path: 'projects',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule('projects', './Routes').then(
        (module) => module.PROJECTS_ROUTES,
      ),
  },
];

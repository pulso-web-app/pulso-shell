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
    title: 'Login',
    loadComponent: () =>
      import('./features/auth/login/login.component').then(
        (module) => module.LoginComponent,
      ),
  },

  {
    path: 'crm',
    title: 'CRM',
    canActivate: [authGuard],
    loadChildren: () =>
      loadRemoteModule('crm', './Routes').then(
        (module) => module.CRM_ROUTES,
      ),
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

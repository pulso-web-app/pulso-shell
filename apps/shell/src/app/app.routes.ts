import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'crm',
  },
  {
    path: 'crm',
    loadChildren: () =>
      loadRemoteModule('crm', './Routes').then(
        (module) => module.CRM_ROUTES,
      ),
  },
  {
    path: 'projects',
    loadChildren: () =>
      loadRemoteModule('projects', './Routes').then(
        (module) => module.PROJECTS_ROUTES,
      ),
  },
];

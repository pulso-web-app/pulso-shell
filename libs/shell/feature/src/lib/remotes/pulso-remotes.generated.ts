// Generated from pulso-tooling/pulso.repositories.json. Do not edit manually.
export interface PulsoRemote {
  readonly key: string;
  readonly path: string;
  readonly title: string;
  readonly icon: string;
  readonly showInNavigation: boolean;
}

export const PULSO_REMOTES: readonly PulsoRemote[] = [
  {
    key: 'crm',
    path: 'crm',
    title: 'CRM',
    icon: 'dashboard',
    showInNavigation: true,
  },
  {
    key: 'projects',
    path: 'projects',
    title: 'Projects',
    icon: 'folder',
    showInNavigation: true,
  },
];

export const PULSO_DEFAULT_REMOTE = 'crm';

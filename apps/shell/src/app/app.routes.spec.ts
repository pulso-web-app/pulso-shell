import {
  PULSO_DEFAULT_REMOTE,
  PULSO_REMOTES,
} from '@pulso-shell/shell-feature';

import { appRoutes } from './app.routes';

describe('generated remote routes', () => {
  it('registers every remote behind the shell composition route', () => {
    for (const remote of PULSO_REMOTES) {
      const route = appRoutes.find(
        (candidate) => candidate.path === remote.path,
      );
      expect(route?.title).toBe(remote.title);
      expect(route?.loadChildren).toBeTypeOf('function');
    }
  });

  it('uses the registered default remote for the root redirect', () => {
    expect(appRoutes.find((route) => route.path === '')?.redirectTo).toBe(
      PULSO_DEFAULT_REMOTE,
    );
  });
});

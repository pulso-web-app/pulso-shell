import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { authGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { guestGuard } from './guest.guard';

describe('authentication guards', () => {
  const authService = {
    currentUser: null as object | null,
    waitUntilReady: vi.fn().mockResolvedValue(undefined),
  };
  const loginTree = { route: '/login' };
  const crmTree = { route: '/crm' };
  const router = {
    createUrlTree: vi.fn((commands: string[]) =>
      commands[0] === '/login' ? loginTree : crmTree,
    ),
  };

  beforeEach(() => {
    authService.currentUser = null;
    authService.waitUntilReady.mockClear();
    router.createUrlTree.mockClear();

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router },
      ],
    });
  });

  it('redirects unauthenticated users to login with their return URL', async () => {
    const result = await TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/projects' } as RouterStateSnapshot,
      ),
    );

    expect(authService.waitUntilReady).toHaveBeenCalledOnce();
    expect(router.createUrlTree).toHaveBeenCalledWith(['/login'], {
      queryParams: { returnUrl: '/projects' },
    });
    expect(result).toBe(loginTree);
  });

  it('allows authenticated users to activate protected routes', async () => {
    authService.currentUser = {};

    const result = await TestBed.runInInjectionContext(() =>
      authGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/crm' } as RouterStateSnapshot,
      ),
    );

    expect(result).toBe(true);
    expect(router.createUrlTree).not.toHaveBeenCalled();
  });

  it('redirects authenticated guests to CRM', async () => {
    authService.currentUser = {};

    const result = await TestBed.runInInjectionContext(() =>
      guestGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/login' } as RouterStateSnapshot,
      ),
    );

    expect(router.createUrlTree).toHaveBeenCalledWith(['/crm']);
    expect(result).toBe(crmTree);
  });

  it('allows unauthenticated guests to activate the login route', async () => {
    const result = await TestBed.runInInjectionContext(() =>
      guestGuard(
        {} as ActivatedRouteSnapshot,
        { url: '/login' } as RouterStateSnapshot,
      ),
    );

    expect(result).toBe(true);
    expect(router.createUrlTree).not.toHaveBeenCalled();
  });
});

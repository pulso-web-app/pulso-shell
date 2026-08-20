import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from '../navigation/navigation.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { AuthService } from '../../core/auth/auth.service';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterModule,
} from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { LoadingOverlayComponent } from '../../shared/ui/loading-overlay/loading-overlay.component';

@Component({
  selector: 'pulso-shell-app-shell',
  imports: [
    MatSidenavModule,
    NavigationComponent,
    TopbarComponent,
    RouterModule,
    LoadingOverlayComponent,
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent implements OnInit {
  readonly authService = inject(AuthService);

  private readonly destroyRef = inject(DestroyRef);
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);

  readonly isMobile = signal(false);
  readonly navigationOpened = signal(true);
  readonly routeLoading = signal(false);
  readonly isLoading = computed(() =>
    this.authService.loading() || this.routeLoading(),
  );
  readonly navigationMode = computed(() =>
    this.isMobile() ? 'over' : 'side',
  );

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ matches }) => {
        this.isMobile.set(matches);
        this.navigationOpened.set(!matches);
      });

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => {
        if (this.isMobile()) {
          this.navigationOpened.set(false);
        }
      });

    this.router.events
      .pipe(
        filter(
          (event) =>
            event instanceof NavigationStart ||
            event instanceof NavigationEnd ||
            event instanceof NavigationCancel ||
            event instanceof NavigationError,
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => {
        this.routeLoading.set(event instanceof NavigationStart);
      });
  }

  toggleNavigation(): void {
    this.navigationOpened.update((opened) => !opened);
  }

  syncNavigationState(opened: boolean): void {
    this.navigationOpened.set(opened);
  }
}

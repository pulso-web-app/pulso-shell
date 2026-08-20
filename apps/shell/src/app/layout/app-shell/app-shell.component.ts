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
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';

@Component({
  selector: 'pulso-shell-app-shell',
  imports: [MatSidenavModule, NavigationComponent, TopbarComponent, RouterModule],
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
  }

  toggleNavigation(): void {
    this.navigationOpened.update((opened) => !opened);
  }

  syncNavigationState(opened: boolean): void {
    this.navigationOpened.set(opened);
  }
}

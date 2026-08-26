import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'pulso-shell-topbar',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatDivider],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {
  private readonly router = inject(Router);

  @Output() readonly menuToggle = new EventEmitter<void>();

  protected currentTitle = signal('');

  ngOnInit(): void {
    this.updateTitle(this.router.routerState.snapshot.root);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle(this.router.routerState.snapshot.root);
      });
  }

  private updateTitle(route: ActivatedRouteSnapshot): void {
    let activeRoute = route;

    while (activeRoute.firstChild) {
      activeRoute = activeRoute.firstChild;
    }

    this.currentTitle.set(activeRoute.title ?? activeRoute.data['title'] ?? '');
  }
}

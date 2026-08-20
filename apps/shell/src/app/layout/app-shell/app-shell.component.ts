import { Component, inject } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationComponent } from '../navigation/navigation.component';
import { TopbarComponent } from '../topbar/topbar.component';
import { AuthService } from '../../core/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'pulso-shell-app-shell',
  imports: [MatSidenavModule, NavigationComponent, TopbarComponent, RouterModule],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
})
export class AppShellComponent {
  authService = inject(AuthService);
}

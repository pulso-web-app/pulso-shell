import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'pulso-shell-navigation',
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }
}

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@pulso-shell/auth-data-access';
import { PULSO_REMOTES } from '../../remotes/pulso-remotes.generated';

@Component({
  selector: 'pulso-shell-navigation',
  imports: [MatListModule, MatIconModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent {
  protected readonly remotes = PULSO_REMOTES.filter(
    (remote) => remote.showInNavigation,
  );
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigate(['/login']);
  }
}

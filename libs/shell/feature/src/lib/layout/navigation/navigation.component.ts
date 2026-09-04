import { MatListModule } from '@angular/material/list';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '@pulso-shell/auth-data-access';
import { PULSO_REMOTES } from '../../remotes/pulso-remotes.generated';

import '@phosphor-icons/webcomponents/PhFolder';
import '@phosphor-icons/webcomponents/PhSignOut';
import '@phosphor-icons/webcomponents/PhSquaresFour';

@Component({
  selector: 'pulso-shell-navigation',
  imports: [MatListModule, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
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

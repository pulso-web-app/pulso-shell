import { Component } from '@angular/core';
import { AppShellComponent } from '@pulso-shell/shell-feature';

@Component({
  imports: [AppShellComponent],
  selector: 'pulso-shell-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // protected readonly authService = inject(AuthService);
  // private readonly router = inject(Router);
  // protected async logout(): Promise<void> {
  //   await this.authService.logout();
  //   await this.router.navigate(['/login']);
  // }
}

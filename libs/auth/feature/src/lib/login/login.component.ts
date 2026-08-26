import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AuthService } from '@pulso-shell/auth-data-access';
import { FloatingParticlesComponent } from '@pulso-shell/shared-ui';

@Component({
  selector: 'pulso-shell-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FloatingParticlesComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly submitting = signal(false);
  readonly error = signal<string | null>(null);
  readonly passwordVisible = signal(false);

  readonly form = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  async login(): Promise<void> {
    if (this.form.invalid || this.submitting()) {
      return;
    }

    this.submitting.set(true);
    this.error.set(null);

    try {
      const { email, password } = this.form.getRawValue();

      await this.authService.login(email, password);

      const returnUrl =
        this.route.snapshot.queryParamMap.get('returnUrl') ?? '/crm';

      await this.router.navigateByUrl(returnUrl);
    } catch {
      this.error.set('E-mail ou senha inválidos.');
    } finally {
      this.submitting.set(false);
    }
  }

  togglePasswordVisibility(): void {
    this.passwordVisible.update((visible) => !visible);
  }
}

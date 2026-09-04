import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { LoginComponent } from './login.component';
import { AuthService } from '@pulso-shell/auth-data-access';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const authServiceMock = {
    login: vi.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders Phosphor icons inside the existing Material login controls', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('mat-card')).not.toBeNull();
    expect(host.querySelectorAll('mat-form-field')).toHaveLength(2);
    expect(host.querySelector('button[mat-flat-button]')).not.toBeNull();
    expect(host.querySelector('ph-squares-four')).not.toBeNull();
    expect(host.querySelector('ph-envelope-simple[matprefix]')).not.toBeNull();
    expect(host.querySelector('ph-lock-simple[matprefix]')).not.toBeNull();
    expect(host.querySelector('ph-eye')).not.toBeNull();
    expect(host.querySelector('mat-icon')).toBeNull();
    expect(
      host.querySelector<HTMLElement>('ph-envelope-simple')?.classList,
    ).toContain('pulso-icon--field-prefix');
    expect(host.querySelector<HTMLElement>('ph-eye')?.classList).toContain(
      'pulso-icon--icon-button',
    );
  });
});

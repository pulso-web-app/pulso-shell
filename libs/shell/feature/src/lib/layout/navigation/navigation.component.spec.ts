import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from '@pulso-shell/auth-data-access';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
  const authServiceMock = {
    logout: vi.fn(),
  };

  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        provideRouter([]),
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps the Material navigation list while rendering Phosphor icons', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelectorAll('mat-nav-list')).toHaveLength(2);
    expect(host.querySelector('a[mat-list-item]')).not.toBeNull();
    expect(host.querySelector('ph-squares-four')).not.toBeNull();
    expect(host.querySelector('ph-folder')).not.toBeNull();
    expect(host.querySelector('ph-sign-out')).not.toBeNull();
    expect(host.querySelector('mat-icon')).toBeNull();
  });
});

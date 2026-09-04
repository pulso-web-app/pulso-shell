import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopbarComponent } from './topbar.component';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('keeps the Material toolbar and icon buttons while rendering Phosphor icons', () => {
    const host = fixture.nativeElement as HTMLElement;

    expect(host.querySelector('mat-toolbar')).not.toBeNull();
    expect(host.querySelectorAll('button[mat-icon-button]')).toHaveLength(3);
    expect(host.querySelector('ph-list')).not.toBeNull();
    expect(host.querySelector('ph-bell')).not.toBeNull();
    expect(host.querySelector('ph-user-circle')).not.toBeNull();
    expect(host.querySelector('mat-icon')).toBeNull();
    expect(host.querySelector<HTMLElement>('ph-list')?.classList).toContain(
      'pulso-icon--icon-button',
    );
  });
});

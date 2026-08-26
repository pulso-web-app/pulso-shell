import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingOverlayComponent } from './loading-overlay.component';

describe('LoadingOverlayComponent', () => {
  let fixture: ComponentFixture<LoadingOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingOverlayComponent);
  });

  it('renders an accessible loading status only while visible', () => {
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeNull();

    fixture.componentRef.setInput('visible', true);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('[role="status"]')).toBeTruthy();
  });
});

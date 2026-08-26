import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'pulso-shell-loading-overlay',
  imports: [],
  templateUrl: './loading-overlay.component.html',
  styleUrl: './loading-overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingOverlayComponent {
  readonly visible = input(false);
}

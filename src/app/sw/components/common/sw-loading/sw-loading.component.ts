import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

@Component({
  selector: 'app-sw-loading',
  imports: [],
  templateUrl: './sw-loading.component.html',
  styleUrl: './sw-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.---appear-delay]': 'apperDelay()',
  },
})
export class SwLoadingComponent {
  readonly delay = input(0, { transform: numberAttribute });

  readonly apperDelay = computed(() => `${this.delay() / 1_000}s`);
}

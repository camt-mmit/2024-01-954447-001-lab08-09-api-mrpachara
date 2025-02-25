import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
} from '@angular/core';

@Component({
  selector: 'app-gl-loading',
  imports: [],
  templateUrl: './gl-loading.component.html',
  styleUrl: './gl-loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.---appear-delay]': 'apperDelay()',
  },
})
export class GlLoadingComponent {
  readonly delay = input(0, { transform: numberAttribute });

  readonly apperDelay = computed(() => `${this.delay() / 1_000}s`);
}

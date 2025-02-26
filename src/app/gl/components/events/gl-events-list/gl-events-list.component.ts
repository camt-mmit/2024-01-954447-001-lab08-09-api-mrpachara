import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  displayEventTimeRange,
  parseEventsList,
  readonlyArray,
} from '../../../helpers';
import { EventsList, EventsQueryParams } from '../../../models';
import { GlLoadingComponent } from '../../common/gl-loading/gl-loading.component';

function parseData(data: EventsList) {
  const parsedEventsList = parseEventsList(data);
  const { items, ...rest } = parsedEventsList;

  return {
    ...rest,
    items: readonlyArray(
      items.map((item) => ({
        ...item,
        displayDateTime: displayEventTimeRange(item),
      })),
    ),
  };
}

@Component({
  selector: 'app-gl-events-list',
  imports: [ReactiveFormsModule, GlLoadingComponent],
  templateUrl: './gl-events-list.component.html',
  styleUrl: './gl-events-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventsListComponent {
  readonly data = input.required<EventsList | undefined>();
  readonly queryParams = input<EventsQueryParams>({});
  readonly isLoading = input(false);

  readonly queryParamsChange = output<EventsQueryParams>();
  readonly reload = output<void>();

  protected readonly parsedData = computed(
    () => (this.data() ? parseData(this.data()!) : undefined),
    {
      equal: (pre, next) => typeof next === 'undefined' || Object.is(pre, next),
    },
  );

  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly formGroup = computed(() =>
    this.fb.group({
      q: this.fb.control(this.queryParams().q ?? '', {
        updateOn: 'submit',
      }),
    }),
  );

  protected onSubmit(): void {
    this.queryParamsChange.emit(this.formGroup().getRawValue());
  }

  protected clear(): void {
    this.queryParamsChange.emit({});
  }
}

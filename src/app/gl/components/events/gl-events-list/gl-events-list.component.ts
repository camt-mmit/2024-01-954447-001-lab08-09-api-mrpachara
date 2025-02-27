import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EventsHelpers, readonlyArray } from '../../../helpers';
import { Events } from '../../../models';
import { GlLoadingComponent } from '../../common/gl-loading/gl-loading.component';

function parseData(data: Events.EventsList) {
  const parsedEventsList = EventsHelpers.parseEventsList(data);
  const { items, ...rest } = parsedEventsList;

  return {
    ...rest,
    items: readonlyArray(
      items.map((item) => ({
        ...item,
        displayDateTime: EventsHelpers.displayEventTimeRange(item),
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
  readonly data = input.required<Events.EventsList | undefined>();
  readonly queryParams = input<Events.EventsQueryParams>({});
  readonly isLoading = input(false);

  readonly queryParamsChange = output<Events.EventsQueryParams>();
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

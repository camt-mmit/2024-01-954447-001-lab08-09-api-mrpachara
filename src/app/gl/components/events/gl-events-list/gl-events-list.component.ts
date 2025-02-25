import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  linkedSignal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  displayEventTimeRange,
  parseEventsList,
  readonlyArray,
} from '../../../helpers';
import { EventsList } from '../../../models';
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
  imports: [ReactiveFormsModule, NgClass, GlLoadingComponent],
  templateUrl: './gl-events-list.component.html',
  styleUrl: './gl-events-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventsListComponent {
  readonly data = input.required<EventsList | undefined>();
  readonly isLoading = input(false);

  protected readonly parsedData = linkedSignal<
    EventsList | undefined,
    ReturnType<typeof parseData> | undefined
  >({
    source: this.data,
    computation: (source, previous) => {
      if (typeof source === 'undefined') {
        return previous ? previous.value : undefined;
      } else {
        return parseData(source);
      }
    },
  }).asReadonly();
}

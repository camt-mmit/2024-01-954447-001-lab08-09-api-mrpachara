import {
  EventDate,
  EventDateAllDay,
  EventDateTime,
  EventResource,
  EventsList,
  OverrideProperties,
} from '../models';
import { readonlyArray } from './common';

/**
 * Parser Functions
 */

export function isEventDateAllDay<
  DA extends OverrideProperties<EventDateAllDay, unknown>,
  DT extends OverrideProperties<EventDateTime, unknown>,
>(data: DA | DT | undefined): data is DA | undefined {
  return typeof (data as DA).date !== 'undefined';
}

export function isEventDateTime<
  DA extends OverrideProperties<EventDateAllDay, unknown>,
  DT extends OverrideProperties<EventDateTime, unknown>,
>(data: DA | DT | undefined): data is DT | undefined {
  return typeof (data as DT).dateTime !== 'undefined';
}

export function parseEventDate(data: EventDate) {
  if (isEventDateTime(data)) {
    const { dateTime, ...rest } = data;

    return {
      ...rest,
      ...(() =>
        dateTime ?
          ({ dateTime: new Date(dateTime) } as const)
        : ({} as { readonly dateTime?: Date }))(),
    } as const;
  } else {
    return { ...data } as const;
  }
}

export function parseEventResource(data: EventResource) {
  const { start, end, ...rest } = data;

  function parseStartOrEnd(
    key: 'start',
    value: EventDate | undefined,
  ): {
    readonly start?: ReturnType<typeof parseEventDate>;
  };

  function parseStartOrEnd(
    key: 'end',
    value: EventDate | undefined,
  ): {
    readonly end?: ReturnType<typeof parseEventDate>;
  };

  function parseStartOrEnd(key: 'start' | 'end', value: EventDate | undefined) {
    if (typeof value === 'undefined') {
      return {};
    }

    return {
      [key]: {
        ...parseEventDate(value),
      } as const,
    } as const;
  }

  return {
    ...rest,
    ...parseStartOrEnd('start', start),
    ...parseStartOrEnd('end', end),
  } as const;
}

export function parseEventsList(data: EventsList) {
  return {
    ...data,
    items: readonlyArray((data?.items || []).map(parseEventResource)),
  } as const;
}

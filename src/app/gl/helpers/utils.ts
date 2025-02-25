import { EmailAddress, HasMetadata, Name, PhoneNumber, Photo } from '../models';
import {
  isEventDateAllDay,
  isEventDateTime,
  parseEventDate,
  parseEventResource,
} from './events';

/**
 * Helper Functions
 */

export function getEventDateDateTime(
  eventDate: ReturnType<typeof parseEventDate>,
): {
  date: string;
  time: string | null;
} {
  const [date, time] = (
    isEventDateTime(eventDate) ?
      eventDate.dateTime
    : eventDate.date)
    .toISOString()
    .split('T');

  return { date, time: isEventDateAllDay(eventDate) ? null : time };
}

export function getEventDateString(
  eventDate: ReturnType<typeof parseEventDate>,
): string {
  if (isEventDateTime(eventDate)) {
    const { dateTime } = eventDate;

    return dateTime.toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  } else {
    const { date } = eventDate;

    return date.toLocaleDateString(undefined, {
      dateStyle: 'medium',
    });
  }
}

export function getEventDateDateString(
  eventDate: ReturnType<typeof parseEventDate>,
): string {
  const date = isEventDateTime(eventDate) ? eventDate.dateTime : eventDate.date;

  return date.toLocaleDateString(undefined, { dateStyle: 'medium' });
}

export function getEventDateTimeString(
  eventDate: ReturnType<typeof parseEventDate>,
): string {
  const date = isEventDateTime(eventDate) ? eventDate.dateTime : eventDate.date;

  return date.toLocaleTimeString(undefined, { timeStyle: 'short' });
}

export function displayEventTimeRange(
  eventResource: ReturnType<typeof parseEventResource>,
): string {
  const { start, end } = eventResource;

  if (start && end) {
    const startDateTime = getEventDateDateTime(start);
    const endDateTime = getEventDateDateTime(end);

    if (startDateTime.date === endDateTime.date) {
      if (startDateTime.time === endDateTime.time) {
        return getEventDateString(start);
      } else {
        return `${getEventDateString(start)} - ${getEventDateTimeString(end)}`;
      }
    } else {
      return `${getEventDateString(start)} to ${getEventDateString(end)}`;
    }
  } else if (start) {
    return getEventDateString(start);
  } else if (end) {
    return getEventDateString(end);
  } else {
    return 'Unknown';
  }
}

export function getPrimaryMetadata<T extends HasMetadata>(
  items: T[],
): T | undefined {
  return items.find((item) => item?.metadata?.primary);
}

export function displayName(names: Name[]): string | undefined {
  return getPrimaryMetadata(names)?.displayName;
}

export function displayEmailAddress(
  emailAddresses: EmailAddress[],
): string | undefined {
  return getPrimaryMetadata(emailAddresses)?.value;
}

export function displayPhoneNumber(
  phoneNumbers: PhoneNumber[],
): string | undefined {
  return getPrimaryMetadata(phoneNumbers)?.value;
}

export function urlPhotos(photos: Photo[]): string | undefined {
  return getPrimaryMetadata(photos)?.url;
}

import { EmailAddress, HasMetadata, Name, PhoneNumber, Photo } from '../models';
import { isEventDateTime, parseEventResource } from './events';

/**
 * Helper Functions
 */

export function displayEventTimeRange(
  eventResource: ReturnType<typeof parseEventResource>,
): string {
  const start =
    isEventDateTime(eventResource.start) ?
      eventResource.start?.dateTime
    : eventResource.start?.date;
  const end =
    isEventDateTime(eventResource.end) ?
      eventResource.end?.dateTime
    : eventResource.end?.date;

  let result = '';

  if (start && end) {
    if (start instanceof Date && end instanceof Date) {
      const startString = start.toLocaleString(undefined, {
        dateStyle: 'short',
        timeStyle: 'short',
      });

      const startDate = start.toLocaleDateString(undefined, {
        dateStyle: 'short',
      });
      const endDate = end.toLocaleDateString(undefined, {
        dateStyle: 'short',
      });

      if (startDate === endDate) {
        const startTime = start.toLocaleTimeString(undefined, {
          timeStyle: 'short',
        });
        const endTime = end.toLocaleTimeString(undefined, {
          timeStyle: 'short',
        });

        result = `${startDate} ${startTime} - ${endTime}`;
      } else {
        const endString = end.toLocaleString(undefined, {
          dateStyle: 'short',
          timeStyle: 'short',
        });

        result = `${startString} to ${endString}`;
      }
    } else {
      result = `${start} to ${end}`;
    }
  } else if (start) {
    result = `${start}`;
  } else if (end) {
    result = `${end}`;
  } else {
    result = 'Unkonwn';
  }

  return result;
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

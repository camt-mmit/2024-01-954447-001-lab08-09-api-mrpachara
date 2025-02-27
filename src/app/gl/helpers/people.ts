import { People } from '../models';
import { readonlyArray } from './common';

/**
 * Parser Functions
 */

export function parseDate(data?: People.Date) {
  return { ...data } as const;
}

export function parseProfileMetadata(data?: People.ProfileMetadata) {
  return { ...data } as const;
}

export function parseSource(data?: People.Source) {
  return {
    ...data,
    profileMetadata: parseProfileMetadata(data?.profileMetadata),
  };
}

export function parseFieldMetadata(data?: People.FieldMetadata) {
  return {
    ...data,
    source: parseSource(data?.source),
  } as const;
}

export function parsePersonMetadata(data?: People.PersonMetadata) {
  return {
    ...data,
    sources: readonlyArray(
      (data?.sources || []).map((data: People.Source) => parseSource(data)),
    ),
  } as const;
}

export function parseHasMetadata(data?: People.HasMetadata) {
  return {
    ...data,
    metadata: parseFieldMetadata(data?.metadata),
  } as const;
}

export function parseAddress(data?: People.Address) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseAgeRangeType(data?: People.AgeRangeType) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseBiography(data?: People.Biography) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseBirthday(data?: People.Birthday) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseCalendarUrl(data?: People.CalendarUrl) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseClientData(data?: People.ClientData) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseCoverPhoto(data?: People.CoverPhoto) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseEmailAddress(data?: People.EmailAddress) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseEvent(data?: People.Event) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseExternalId(data?: People.ExternalId) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseFileAs(data?: People.FileAs) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseGender(data?: People.Gender) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseImClient(data?: People.ImClient) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseInterest(data?: People.Interest) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseLocale(data?: People.Locale) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseLocation(data?: People.Location) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseContactGroupMembership(
  data?: People.ContactGroupMembership,
) {
  return { ...data } as const;
}

export function parseDomainMembership(data?: People.DomainMembership) {
  return { ...data } as const;
}

export function parseMembership(data?: People.Membership) {
  const membership = {
    ...data,
    ...parseHasMetadata(data),
  };

  if (
    ((
      membership: People.Membership & { contactGroupMembership?: unknown },
    ): membership is People.Membership & {
      readonly contactGroupMembership?: People.ContactGroupMembership;
    } => typeof membership.contactGroupMembership !== 'undefined')(membership)
  ) {
    membership.contactGroupMembership = parseContactGroupMembership(
      membership.contactGroupMembership,
    );
  }

  if (
    ((
      membership: People.Membership & { domainMembership?: unknown },
    ): membership is People.Membership & {
      readonly domainMembership?: People.DomainMembership;
    } => typeof membership.domainMembership !== 'undefined')(membership)
  ) {
    membership.domainMembership = parseDomainMembership(
      membership.domainMembership,
    );
  }

  return { ...membership } as const;
}

export function parseMiscKeyword(data?: People.MiscKeyword) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseName(data?: People.Name) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseNickname(data?: People.Nickname) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseOccupation(data?: People.Occupation) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseOrganization(data?: People.Organization) {
  return {
    ...data,
    ...parseHasMetadata(data),
    startDate: parseDate(data?.startDate),
    endDate: parseDate(data?.endDate),
  } as const;
}

export function parsePhoneNumber(data?: People.PhoneNumber) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parsePhoto(data?: People.Photo) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseRelation(data?: People.Relation) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseSipAddress(data?: People.SipAddress) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseSkill(data?: People.Skill) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseUrl(data?: People.Url) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parseUserDefined(data?: People.UserDefined) {
  return {
    ...data,
    ...parseHasMetadata(data),
  } as const;
}

export function parsePerson(data: People.Person) {
  return {
    ...data,
    metadata: parsePersonMetadata(data?.metadata),
    addresses: readonlyArray((data?.addresses || []).map(parseAddress)),
    ageRanges: readonlyArray((data?.ageRanges || []).map(parseAgeRangeType)),
    biographies: readonlyArray((data?.biographies || []).map(parseBiography)),
    birthdays: readonlyArray((data?.birthdays || []).map(parseBirthday)),
    calendarUrls: readonlyArray(
      (data?.calendarUrls || []).map(parseCalendarUrl),
    ),
    clientData: readonlyArray((data?.clientData || []).map(parseClientData)),
    coverPhotos: readonlyArray((data?.coverPhotos || []).map(parseCoverPhoto)),
    emailAddresses: readonlyArray(
      (data?.emailAddresses || []).map(parseEmailAddress),
    ),
    events: readonlyArray((data?.events || []).map(parseEvent)),
    externalIds: readonlyArray((data?.externalIds || []).map(parseExternalId)),
    fileAses: readonlyArray((data?.fileAses || []).map(parseFileAs)),
    genders: readonlyArray((data?.genders || []).map(parseGender)),
    imClients: readonlyArray((data?.imClients || []).map(parseImClient)),
    interests: readonlyArray((data?.interests || []).map(parseInterest)),
    locales: readonlyArray((data?.locales || []).map(parseLocale)),
    locations: readonlyArray((data?.locations || []).map(parseLocation)),
    memberships: readonlyArray((data?.memberships || []).map(parseMembership)),
    miscKeywords: readonlyArray(
      (data?.miscKeywords || []).map(parseMiscKeyword),
    ),
    names: readonlyArray((data?.names || []).map(parseName)),
    nicknames: readonlyArray((data?.nicknames || []).map(parseNickname)),
    occupations: readonlyArray((data?.occupations || []).map(parseOccupation)),
    organizations: readonlyArray(
      (data?.organizations || []).map(parseOrganization),
    ),
    phoneNumbers: readonlyArray(
      (data?.phoneNumbers || []).map(parsePhoneNumber),
    ),
    photos: readonlyArray((data?.photos || []).map(parsePhoto)),
    relations: readonlyArray((data?.relations || []).map(parseRelation)),
    sipAddresses: readonlyArray(
      (data?.sipAddresses || []).map(parseSipAddress),
    ),
    skills: readonlyArray((data?.skills || []).map(parseSkill)),
    urls: readonlyArray((data?.urls || []).map(parseUrl)),
    userDefined: readonlyArray((data?.userDefined || []).map(parseUserDefined)),
  } as const;
}

export function parseConnectionsList(
  data: People.ConnectionsList,
): People.ConnectionsList {
  return {
    ...data,
    connections: readonlyArray((data?.connections || []).map(parsePerson)),
  } as const;
}

// Utilities

export function getPrimaryMetadata<T extends People.HasMetadata>(
  items: T[],
): T | undefined {
  return items.find((item) => item?.metadata?.primary);
}

export function displayName(names: People.Name[]): string | undefined {
  return getPrimaryMetadata(names)?.displayName;
}

export function displayEmailAddress(
  emailAddresses: People.EmailAddress[],
): string | undefined {
  return getPrimaryMetadata(emailAddresses)?.value;
}

export function displayPhoneNumber(
  phoneNumbers: People.PhoneNumber[],
): string | undefined {
  return getPrimaryMetadata(phoneNumbers)?.value;
}

export function urlPhotos(photos: People.Photo[]): string | undefined {
  return getPrimaryMetadata(photos)?.url;
}

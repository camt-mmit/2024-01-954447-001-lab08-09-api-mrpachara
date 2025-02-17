import { signal, Signal } from '@angular/core';
import { Person, Resource, ResourcesList } from './models';

export const apiUrl = 'https://swapi.dev/api';

export async function fetchResource<T extends Resource = Resource>(
  url: URL,
): Promise<T | undefined> {
  const res = await fetch(url);

  if (res.ok) {
    const json = await res.json();

    return json;
  } else {
    return undefined;
  }
}

export function resourceSignal<T extends Resource = Resource>(
  url: URL | null,
): Signal<T | null | undefined> {
  const resource = signal<T | null | undefined>(undefined);

  if (url === null) {
    resource.set(null);
  } else {
    (async () => {
      const res = await fetch(url);

      if (res.ok) {
        const json = await res.json();

        resource.set(json);
      } else {
        return resource.set(null);
      }
    })();
  }

  return resource.asReadonly();
}

export function parseResource<T extends Resource = Resource>(resource: T) {
  const { created, edited, url, ...rest } = resource;

  return {
    ...rest,
    id: url,
    created: new Date(created),
    edited: new Date(edited),
    url: new URL(url),
  } as const;
}

export function parseResourcesList<T extends Resource = Resource>(
  resourcesList: ResourcesList<T>,
) {
  const { previous, next, ...rest } = resourcesList;

  return {
    ...rest,
    previous: previous === null ? null : new URL(previous),
    next: next === null ? null : new URL(next),
  } as const;
}

export function parsePerson(person: Person) {
  const { homeworld, films, species, starships, vehicles, ...rest } = person;

  return {
    ...parseResource(rest),
    homeworld: homeworld === null ? null : new URL(homeworld),
    films: films.map((url) => new URL(url)) as readonly URL[],
    species: species.map((url) => new URL(url)) as readonly URL[],
    starships: starships.map((url) => new URL(url)) as readonly URL[],
    vehicles: vehicles.map((url) => new URL(url)) as readonly URL[],
  } as const;
}

export function parsePeopleList(resourcesList: ResourcesList<Person>) {
  const { results } = resourcesList;

  return {
    ...parseResourcesList(resourcesList),
    results: results.map((result) =>
      parsePerson(result),
    ) as readonly ReturnType<typeof parsePerson>[],
  } as const;
}

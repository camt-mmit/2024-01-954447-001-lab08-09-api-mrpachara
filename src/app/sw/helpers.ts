import { signal, Signal, untracked } from '@angular/core';
import { Person, Planet, Resource, ResourcesList, Species } from './models';

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

export function resourceSignal<T>(
  url: URL | null,
): Signal<T | null | undefined>;

export function resourceSignal<T, R>(
  url: URL | null,
  transform: (value: T) => R,
): Signal<R | null | undefined>;

export function resourceSignal<T, R>(
  url: URL | null,
  transform?: (value: T) => R,
): Signal<R | null | undefined> {
  return untracked(() => {
    const resource = signal<R | null | undefined>(undefined);

    if (url === null) {
      resource.set(null);
    } else {
      (async () => {
        const res = await fetch(url);

        if (res.ok) {
          const json = await res.json();

          resource.set(
            typeof transform !== 'undefined' ? transform(json) : json,
          );
        } else {
          return resource.set(null);
        }
      })();
    }

    return resource.asReadonly();
  });
}

export function parseResource(resource: Resource) {
  const { created, edited, url } = resource;

  return {
    ...resource,
    id: url,
    created: new Date(created),
    edited: new Date(edited),
    url: new URL(url),
  } as const;
}

export function parseResourcesList<T extends Resource>(
  resourcesList: ResourcesList<T>,
) {
  const { previous, next } = resourcesList;

  return {
    ...resourcesList,
    previous: previous !== null ? new URL(previous) : null,
    next: next !== null ? new URL(next) : null,
  } as const;
}

export function readonlyArray<T>(ar: T[]): readonly T[] {
  return ar;
}

export function parsePerson(resource: Person) {
  const { homeworld, films, species, starships, vehicles } = resource;

  return {
    ...resource,
    ...parseResource(resource),
    homeworld: homeworld !== null ? new URL(homeworld) : null,
    films: readonlyArray(films.map((url) => new URL(url))),
    species: readonlyArray(species.map((url) => new URL(url))),
    starships: readonlyArray(starships.map((url) => new URL(url))),
    vehicles: readonlyArray(vehicles.map((url) => new URL(url))),
  } as const;
}

export function parsePeopleList<T extends Person>(
  resourcesList: ResourcesList<T>,
) {
  const parsedResourcesList = parseResourcesList(resourcesList);
  const { results } = parsedResourcesList;

  return {
    ...parsedResourcesList,
    results: readonlyArray(results.map(parsePerson)),
  } as const;
}

export function parseSpecies(resource: Species) {
  const { homeworld, people, films } = resource;

  return {
    ...resource,
    ...parseResource(resource),
    homeworld: homeworld !== null ? new URL(homeworld) : null,
    people: readonlyArray(people.map((url) => new URL(url))),
    films: readonlyArray(films.map((url) => new URL(url))),
  } as const;
}

export function parseSpeciesList<T extends Species>(
  resourcesList: ResourcesList<T>,
) {
  const parsedResourcesList = parseResourcesList(resourcesList);
  const { results } = parsedResourcesList;

  return {
    ...parsedResourcesList,
    results: readonlyArray(results.map((result) => parseSpecies(result))),
  } as const;
}

export function parsePlanet(resource: Planet) {
  const { residents, films } = resource;

  return {
    ...resource,
    ...parseResource(resource),
    residents: readonlyArray(residents.map((url) => new URL(url))),
    films: readonlyArray(films.map((url) => new URL(url))),
  } as const;
}

export function parsePlanetsList<T extends Planet>(
  resourcesList: ResourcesList<T>,
) {
  const parsedResourcesList = parseResourcesList(resourcesList);
  const { results } = parsedResourcesList;

  return {
    ...parsedResourcesList,
    results: readonlyArray(results.map((result) => parsePlanet(result))),
  } as const;
}

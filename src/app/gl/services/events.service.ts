import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Injector, ResourceRef } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { defer, fromEvent, switchMap, take, takeUntil } from 'rxjs';
import { EventQueryParams, EventsList } from '../models';
import { OauthService } from './oauth.service';

const serviceUrl =
  'https://www.googleapis.com/calendar/v3/calendars/primary/events';

const defaultQueryParams: EventQueryParams = {
  eventTypes: ['default', 'fromGmail'],
};

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private readonly http = inject(HttpClient);
  private readonly oauthService = inject(OauthService);

  getAll(
    queryParams: () => EventQueryParams,
    { injector = undefined as Injector | undefined } = {},
  ): ResourceRef<EventsList | undefined> {
    return rxResource({
      request: queryParams,

      loader: ({ request, abortSignal }) =>
        defer(() => this.oauthService.getAuthorizationHeaders()).pipe(
          switchMap((authorizationHeaders) =>
            this.http.get<EventsList>(serviceUrl, {
              headers: { ...authorizationHeaders },
              params: {
                ...defaultQueryParams,
                timeMin: (() => {
                  const date = new Date();
                  date.setFullYear(date.getFullYear() - 1);

                  return date.toISOString();
                })(),
                ...request,
              },
            }),
          ),
          takeUntil(fromEvent(abortSignal, 'abort').pipe(take(1))),
        ),

      injector: injector,
    });
  }
}

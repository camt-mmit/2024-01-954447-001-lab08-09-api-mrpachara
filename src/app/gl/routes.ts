import { isDevMode } from '@angular/core';
import { Routes } from '@angular/router';
import { OauthConfiguration } from './models';
import { GlEventCreatePageComponent } from './pages/events/gl-event-create-page/gl-event-create-page.component';
import { GlEventsListPageComponent } from './pages/events/gl-events-list-page/gl-events-list-page.component';
import { GlAuthorizationPageComponent } from './pages/gl-authorization-page/gl-authorization-page.component';
import { GlPageComponent } from './pages/gl-page/gl-page.component';
import { EventsService } from './services/events.service';
import { OAUTH_CONFIGURATION, OauthService } from './services/oauth.service';

export default [
  {
    path: '',
    providers: [
      {
        provide: OAUTH_CONFIGURATION,
        useValue: {
          name: 'google',
          clientId:
            '209689905225-dj1bo29m0c7or5926cv4bb1nu5aru0cv.apps.googleusercontent.com',
          clientSecret: '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',
          authorizationCodeUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
          accessTokenUrl: 'https://oauth2.googleapis.com/token',
          redirectUri:
            isDevMode() ?
              'http://localhost:4200/google/authorization'
            : 'https://camt-mmit.github.io/2024-01-954447-001-lab08-09-api-mrpachara/google/authorization',
        } satisfies OauthConfiguration,
      },

      OauthService,
    ],
    children: [
      { path: 'authorization', component: GlAuthorizationPageComponent },

      {
        path: '',
        component: GlPageComponent,
        children: [
          { path: '', redirectTo: 'events', pathMatch: 'full' },

          {
            path: 'events',
            providers: [EventsService],
            children: [
              { path: '', component: GlEventsListPageComponent },
              { path: 'create', component: GlEventCreatePageComponent },
            ],
          },
        ],
      },
    ],
  },
] as Routes;

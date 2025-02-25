import { Routes } from '@angular/router';
import { OauthConfiguration } from './models';
import { GlEventCreatePageComponent } from './pages/events/gl-event-create-page/gl-event-create-page.component';
import { GlEventsListPageComponent } from './pages/events/gl-events-list-page/gl-events-list-page.component';
import { GlEventsPageComponent } from './pages/events/gl-events-page/gl-events-page.component';
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
          redirectUri: 'http://localhost:4200/google/authorization',
        } satisfies OauthConfiguration,
      },

      OauthService,
      EventsService,
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
            component: GlEventsPageComponent,
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

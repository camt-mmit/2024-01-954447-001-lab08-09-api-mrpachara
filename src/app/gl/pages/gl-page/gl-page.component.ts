import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { GlLoadingComponent } from '../../components/common/gl-loading/gl-loading.component';
import { OauthService } from '../../services/oauth.service';

const scopes = [
  'profile',
  'https://www.googleapis.com/auth/calendar.events',
] as const;

export interface GlState {
  intendedUrl: string;
}

@Component({
  selector: 'app-gl-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive, GlLoadingComponent],
  templateUrl: './gl-page.component.html',
  styleUrl: './gl-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlPageComponent {
  protected readonly oauthService = inject(OauthService);
  protected readonly router = inject(Router);

  protected async login(): Promise<void> {
    const authorizationUrl =
      await this.oauthService.getAuthorizationUrl<GlState>(scopes, {
        state: {
          intendedUrl: this.router.url,
        },
        additionalParams: {
          prompt: 'consent',
          access_type: 'offline',
        },
      });

    if (authorizationUrl) {
      location.href = `${authorizationUrl}`;
    }
  }

  protected async logout(): Promise<void> {
    await this.oauthService.clear();
  }
}

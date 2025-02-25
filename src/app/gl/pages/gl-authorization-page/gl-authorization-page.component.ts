import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { OauthService } from '../../services/oauth.service';
import { GlState } from '../gl-page/gl-page.component';

@Component({
  selector: 'app-gl-authorization-page',
  imports: [],
  templateUrl: './gl-authorization-page.component.html',
  styleUrl: './gl-authorization-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlAuthorizationPageComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly oauthService = inject(OauthService);

  private readonly queryParams$ = this.activatedRoute.queryParams;

  protected readonly code = toSignal(
    this.queryParams$.pipe(map(({ code }) => code as string)),
  );

  protected readonly stateToken = toSignal(
    this.queryParams$.pipe(map(({ state }) => state as string)),
  );

  private readonly authorizationError = toSignal(
    this.queryParams$.pipe(
      map(({ error, error_description }) =>
        error || error_description ? { error, error_description } : undefined,
      ),
    ),
  );

  protected readonly error = linkedSignal(() => this.authorizationError());

  constructor() {
    effect(async () => {
      const code = this.code();
      const stateToken = this.stateToken();

      if (code && stateToken) {
        try {
          const state =
            await this.oauthService.exchangeAuthorizationcode<GlState>(
              code,
              stateToken,
            );

          this.router.navigateByUrl(state.intendedUrl);
        } catch (error) {
          if (error instanceof HttpErrorResponse) {
            this.error.set(error.error);
          } else if (error instanceof Error) {
            this.error.set({
              error: error.name,
              error_description: error.message,
            });
          }

          throw error;
        }
      }
    });
  }
}

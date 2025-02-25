import { HttpClient } from '@angular/common/http';
import { inject, Injectable, InjectionToken, resource } from '@angular/core';
import { catchError, defer, firstValueFrom, of, switchMap, tap } from 'rxjs';
import { arrayBufferToBase64, randomString, sha256 } from '../helpers';
import {
  AccessTokenData,
  OauthConfiguration,
  StateData,
  StateTokenNotFound,
  StoredAccessTokenData,
  StoredStateData,
} from '../models';
import { StorageService } from './storage.service';

export const OAUTH_CONFIGURATION = new InjectionToken<OauthConfiguration>(
  'oauth-configuration',
);

const codeVerifierLength = 54;
const stateTokenLength = 32;
const stateDataTtl = 10 * 60 * 1000; // milli-second

const latency = 10 * 1000; // milli-second

@Injectable({
  providedIn: 'root',
})
export class OauthService {
  private readonly config = inject(OAUTH_CONFIGURATION);
  private readonly storage = inject(StorageService);
  private readonly http = inject(HttpClient);

  private readonly storedStateDataKey =
    `oauth-${this.config.name}-access-states` as const;

  private readonly storedAccessTokenDataKey =
    `oauth-${this.config.name}-access-token` as const;

  private readonly storaedRefreshTokenDataKey =
    `oauth-${this.config.name}-refresh-token` as const;

  private readonly readyResource = resource({
    loader: async () => {
      const storedAccessTokenData = await this.getAccessTokenData();

      return storedAccessTokenData !== null;
    },
  });

  readonly ready = this.readyResource.value.asReadonly();

  private async storeAccessTokenData(
    accessTokenData: AccessTokenData,
  ): Promise<StoredAccessTokenData> {
    const { refresh_token, ...restAccessTokenData } = accessTokenData;

    if (refresh_token) {
      await this.storage.set<string>(
        this.storaedRefreshTokenDataKey,
        refresh_token,
      );
    }

    const storedAccessTokenData = {
      ...restAccessTokenData,
      expiredAt: Date.now() + restAccessTokenData.expires_in * 1000 - latency,
    };

    await this.storage.set<StoredAccessTokenData>(
      this.storedAccessTokenDataKey,
      storedAccessTokenData,
    );

    return storedAccessTokenData;
  }

  private async refreshAccessTokenData(): Promise<StoredAccessTokenData | null> {
    const refreshToken = await this.storage.get<string>(
      this.storaedRefreshTokenDataKey,
    );

    if (refreshToken) {
      const accessTokenData = await firstValueFrom(
        this.http
          .post<AccessTokenData>(this.config.accessTokenUrl, {
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
          })
          .pipe(
            catchError((error) => {
              console.error(error);

              return of(null);
            }),
          ),
      );

      if (accessTokenData) {
        return this.storeAccessTokenData(accessTokenData);
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async getAccessTokenData(): Promise<StoredAccessTokenData | null> {
    return firstValueFrom(
      defer(
        async () =>
          await this.storage.get<StoredAccessTokenData>(
            this.storedAccessTokenDataKey,
          ),
      ).pipe(
        switchMap((storedAccessTokenData) => {
          if (
            storedAccessTokenData &&
            storedAccessTokenData.expiredAt >= Date.now()
          ) {
            return of(storedAccessTokenData);
          } else {
            return this.refreshAccessTokenData();
          }
        }),
        tap((storedAccessTokenData) =>
          this.readyResource.set(storedAccessTokenData !== null),
        ),
      ),
    );
  }

  async getAuthorizationHeaders(): Promise<{
    Authorization: `${string} ${string}`;
  } | null> {
    const accessTokenData = await this.getAccessTokenData();

    if (accessTokenData) {
      const { token_type, access_token } = accessTokenData;

      return {
        Authorization:
          `${token_type[0].toUpperCase()}${token_type.slice(1)} ${access_token}` as const,
      };
    } else {
      return null;
    }
  }

  private async getStateData<T extends StateData['state'] = StateData['state']>(
    stateToken: string,
  ): Promise<StateData<T> | null> {
    const storedStateDataRecord =
      (await this.storage.get<Record<string, StoredStateData<T>>>(
        this.storedStateDataKey,
      )) ?? {};

    const now = Date.now();
    const entries = Object.entries(storedStateDataRecord);
    const avaliableEntries = entries.filter(
      ([, value]) => value.expiredAt >= now,
    );
    const avaliableStoredStateDataRecord = Object.fromEntries(avaliableEntries);

    if (entries.length !== avaliableEntries.length) {
      await this.storage.set(
        this.storedStateDataKey,
        avaliableStoredStateDataRecord,
      );
    }

    return avaliableStoredStateDataRecord[stateToken] ?? null;
  }

  private async setStateData<T extends StateData['state']>(
    stateToken: string,
    stateData: StateData<T>,
  ): Promise<void> {
    const storedStateDataRecord =
      (await this.storage.get<Record<string, StoredStateData<T>>>(
        this.storedStateDataKey,
      )) ?? {};

    storedStateDataRecord[stateToken] = {
      ...stateData,
      expiredAt: Date.now() + stateDataTtl,
    };

    return await this.storage.set(
      this.storedStateDataKey,
      storedStateDataRecord,
    );
  }

  private async removeStateData(stateToken: string): Promise<void> {
    const storedStateDataRecord =
      (await this.storage.get<Record<string, StoredStateData>>(
        this.storedStateDataKey,
      )) ?? {};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [stateToken]: _removed, ...remainStoredStateDataRecord } =
      storedStateDataRecord;

    if (Object.keys(remainStoredStateDataRecord).length === 0) {
      return await this.storage.remove(this.storedStateDataKey);
    } else {
      return await this.storage.set(
        this.storedStateDataKey,
        remainStoredStateDataRecord,
      );
    }
  }

  private async createStateData(
    state: StateData['state'],
  ): Promise<{ stateToken: string; codeChallenge: string }> {
    const stateToken = randomString(stateTokenLength);

    const codeVerifier = randomString(codeVerifierLength);
    const codeChallenge = arrayBufferToBase64(await sha256(codeVerifier), true);

    await this.setStateData(stateToken, {
      codeVerifier,
      state,
    });

    return { stateToken, codeChallenge };
  }

  async getAuthorizationUrl<T extends StateData['state']>(
    scopes: readonly string[],
    { state = {} as T, additionalParams = {} as Record<string, string> } = {},
  ): Promise<URL | null> {
    const authorizationCodeUrl = this.config.authorizationCodeUrl;

    if (authorizationCodeUrl) {
      const { stateToken, codeChallenge } = await this.createStateData(state);

      const url = new URL(authorizationCodeUrl);

      url.searchParams.set('client_id', this.config.clientId);
      url.searchParams.set('response_type', 'code');
      url.searchParams.set('scope', scopes.join(' '));
      url.searchParams.set('state', stateToken);
      url.searchParams.set('code_challenge', codeChallenge);
      url.searchParams.set('code_challenge_method', 'S256');
      url.searchParams.set('redirect_uri', this.config.redirectUri);

      // NOTE: The following 2 parameters, prompt and access_type,
      //       are required for getting the refresh_token.
      // url.searchParams.set('prompt', 'consent');
      // url.searchParams.set('access_type', 'offline');
      Object.entries(additionalParams).forEach(([key, value]) =>
        url.searchParams.set(key, value),
      );

      return url;
    } else {
      return null;
    }
  }

  async exchangeAuthorizationcode<T extends StateData['state']>(
    authorizaitonCode: string,
    stateToken: string,
  ): Promise<T> {
    const stateData = await this.getStateData<T>(stateToken);

    if (stateData === null) {
      throw new StateTokenNotFound(stateToken, {
        cause: { authorizaitonCode },
      });
    }

    await this.storeAccessTokenData(
      await firstValueFrom(
        this.http.post<AccessTokenData>(this.config.accessTokenUrl, {
          client_id: this.config.clientId,
          client_secret: this.config.clientSecret,
          code: authorizaitonCode,
          code_verifier: stateData.codeVerifier,
          grant_type: 'authorization_code',
          redirect_uri: this.config.redirectUri,
        }),
      ),
    );

    await this.removeStateData(stateToken);

    this.readyResource.set(true);

    return stateData.state;
  }

  async clear(): Promise<void> {
    await Promise.all([
      this.storage.remove(this.storedAccessTokenDataKey),
      this.storage.remove(this.storaedRefreshTokenDataKey),
      this.storage.remove(this.storedStateDataKey),
    ]);

    this.readyResource.set(false);
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SwLoadingComponent } from '../../../components/common/sw-loading/sw-loading.component';
import { SwPlanetViewComponent } from '../../../components/planets/sw-planet-view/sw-planet-view.component';
import { PlanetsService } from '../../../services/planets.service';
import { createSwNavigateFn } from '../../helpers';

@Component({
  selector: 'app-sw-planet-view-page',
  imports: [SwPlanetViewComponent, SwLoadingComponent],
  templateUrl: './sw-planet-view-page.component.html',
  styleUrl: './sw-planet-view-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPlanetViewPageComponent {
  private readonly service = inject(PlanetsService);

  private readonly params$ = inject(ActivatedRoute).params;

  private readonly id = toSignal(
    this.params$.pipe(map(({ id }) => id as string)),
    { initialValue: '' },
  );

  protected readonly resource = this.service.get(this.id);

  private readonly natigate = createSwNavigateFn();

  protected onLinkClick(id: string): void {
    this.natigate(id);
  }

  protected back(): void {
    history.back();
  }
}

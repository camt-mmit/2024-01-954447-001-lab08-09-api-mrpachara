import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SwLoadingComponent } from '../../../components/common/sw-loading/sw-loading.component';
import { SwSpeciesViewComponent } from '../../../components/species/sw-species-view/sw-species-view.component';
import { SpeciesService } from '../../../services/species.service';
import { createSwNavigateFn } from '../../helpers';

@Component({
  selector: 'app-sw-species-view-page',
  imports: [SwSpeciesViewComponent, SwLoadingComponent],
  templateUrl: './sw-species-view-page.component.html',
  styleUrl: './sw-species-view-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwSpeciesViewPageComponent {
  private readonly service = inject(SpeciesService);

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

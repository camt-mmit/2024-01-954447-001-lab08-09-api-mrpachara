import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { GlEventsListComponent } from '../../../components/events/gl-events-list/gl-events-list.component';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-gl-events-list-page',
  imports: [GlEventsListComponent],
  templateUrl: './gl-events-list-page.component.html',
  styleUrl: './gl-events-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventsListPageComponent {
  private readonly service = inject(EventsService);
  private readonly activatedRoute = inject(ActivatedRoute);

  private readonly queryParams$ = this.activatedRoute.queryParams;

  private readonly queryParams = toSignal(this.queryParams$, {
    initialValue: {},
  });

  protected readonly resource = this.service.getAll(this.queryParams);
}

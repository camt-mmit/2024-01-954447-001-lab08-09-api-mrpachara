import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { take } from 'rxjs';
import { GlEventFormComponent } from '../../../components/events/gl-event-form/gl-event-form.component';
import { EventInsertBody } from '../../../models/events';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-gl-event-create-page',
  imports: [GlEventFormComponent],
  templateUrl: './gl-event-create-page.component.html',
  styleUrl: './gl-event-create-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventCreatePageComponent {
  private readonly service = inject(EventsService);

  protected readonly disabled = signal(false);

  protected onFormSubmit(data: EventInsertBody): void {
    this.disabled.set(true);

    this.service
      .create(data)
      .pipe(take(1))
      .subscribe({
        complete: () => history.back(),
        error: () => this.disabled.set(false),
      });
  }

  protected onFormCancel(): void {
    history.back();
  }
}

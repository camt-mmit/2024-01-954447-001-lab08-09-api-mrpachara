import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-gl-events-page',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './gl-events-page.component.html',
  styleUrl: './gl-events-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GlEventsPageComponent {}

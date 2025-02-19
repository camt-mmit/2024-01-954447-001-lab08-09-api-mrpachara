import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { SwResourceDirective } from '../../../directives/sw-resource.directive';
import {
  parsePerson,
  parsePlanet,
  readonlyArray,
  resourceSignal,
} from '../../../helpers';
import { Planet } from '../../../models';

@Component({
  selector: 'app-sw-planet-view',
  imports: [DatePipe, SwResourceDirective],
  templateUrl: './sw-planet-view.component.html',
  styleUrl: './sw-planet-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPlanetViewComponent {
  readonly data = input.required<Planet>();

  readonly linkClick = output<URL>();

  readonly parsedData = computed(() => {
    const { residents, ...rest } = parsePlanet(this.data());

    return {
      ...rest,
      residents: readonlyArray(
        residents.map((url) => resourceSignal(url, parsePerson)),
      ),
    } as const;
  });

  readonly normalizedName = computed(() =>
    this.parsedData()
      .name.replaceAll(/[\s']+/g, '-')
      .toLocaleLowerCase(),
  );

  protected onLinkClick(url: URL | undefined): void {
    if (url) {
      this.linkClick.emit(url);
    }
  }
}

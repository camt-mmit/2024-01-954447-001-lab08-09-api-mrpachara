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
  parseSpecies,
  readonlyArray,
  resourceSignal,
} from '../../../helpers';
import { Person } from '../../../models';

@Component({
  selector: 'app-sw-person-view',
  imports: [DatePipe, SwResourceDirective],
  templateUrl: './sw-person-view.component.html',
  styleUrl: './sw-person-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPersonViewComponent {
  readonly data = input.required<Person>();

  readonly linkClick = output<URL>();

  readonly parsedData = computed(() => {
    const { homeworld, species, ...rest } = parsePerson(this.data());

    return {
      ...rest,
      homeworld: resourceSignal(homeworld, parsePlanet),
      species: readonlyArray(
        species.map((url) => resourceSignal(url, parseSpecies)),
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

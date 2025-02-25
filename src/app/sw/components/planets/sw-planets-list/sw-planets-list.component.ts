import { DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SwNumberDirective } from '../../../directives/sw-number.directive';
import { parsePlanetsList } from '../../../helpers';
import { Planet, ResourcesList, SearchData } from '../../../models';
import { SwLoadingComponent } from '../../common/sw-loading/sw-loading.component';

@Component({
  selector: 'app-sw-planets-list',
  imports: [
    ReactiveFormsModule,
    DecimalPipe,
    SwLoadingComponent,
    SwNumberDirective,
  ],
  templateUrl: './sw-planets-list.component.html',
  styleUrl: './sw-planets-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPlanetsListComponent {
  readonly data = input.required<ResourcesList<Planet> | undefined>();
  readonly searchData = input.required<SearchData>();
  readonly isLoading = input.required<boolean>();

  readonly searchDataChange = output<SearchData>();
  readonly itemSelect = output<string>();

  protected readonly parsedData = linkedSignal<
    ResourcesList<Planet> | undefined,
    ReturnType<typeof parsePlanetsList> | undefined
  >({
    source: this.data,
    computation: (source, previous) => {
      if (typeof source === 'undefined') {
        return previous ? previous.value : undefined;
      } else {
        return parsePlanetsList(source);
      }
    },
  }).asReadonly();

  private readonly fb = inject(FormBuilder).nonNullable;

  protected readonly formGroup = computed(() =>
    this.fb.group({
      search: this.fb.control(this.searchData().search ?? '', {
        updateOn: 'submit',
      }),
    }),
  );

  protected select(id: string): void {
    if (id) {
      this.itemSelect.emit(id);
    }
  }

  protected onSubmit(): void {
    this.searchDataChange.emit(this.formGroup().getRawValue());
  }

  protected clear(): void {
    this.searchDataChange.emit({});
  }

  protected goto(url: URL | null): void {
    if (url) {
      this.searchDataChange.emit(Object.fromEntries(url.searchParams));
    }
  }
}

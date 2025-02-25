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
import { parseSpeciesList } from '../../../helpers';
import { ResourcesList, SearchData, Species } from '../../../models';
import { SwLoadingComponent } from '../../common/sw-loading/sw-loading.component';

@Component({
  selector: 'app-sw-species-list',
  imports: [ReactiveFormsModule, SwLoadingComponent],
  templateUrl: './sw-species-list.component.html',
  styleUrl: './sw-species-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwSpeciesListComponent {
  readonly data = input.required<ResourcesList<Species> | undefined>();
  readonly searchData = input.required<SearchData>();
  readonly isLoading = input.required<boolean>();

  readonly searchDataChange = output<SearchData>();
  readonly itemSelect = output<string>();

  protected readonly parsedData = linkedSignal<
    ResourcesList<Species> | undefined,
    ReturnType<typeof parseSpeciesList> | undefined
  >({
    source: this.data,
    computation: (source, previous) => {
      if (typeof source === 'undefined') {
        return previous ? previous.value : undefined;
      } else {
        return parseSpeciesList(source);
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

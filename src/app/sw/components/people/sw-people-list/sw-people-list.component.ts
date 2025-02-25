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
import { parsePeopleList } from '../../../helpers';
import { Person, ResourcesList, SearchData } from '../../../models';
import { SwLoadingComponent } from '../../common/sw-loading/sw-loading.component';

@Component({
  selector: 'app-sw-people-list',
  imports: [ReactiveFormsModule, SwLoadingComponent],
  templateUrl: './sw-people-list.component.html',
  styleUrl: './sw-people-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwPeopleListComponent {
  readonly data = input.required<ResourcesList<Person> | undefined>();
  readonly searchData = input.required<SearchData>();
  readonly isLoading = input.required<boolean>();

  readonly searchDataChange = output<SearchData>();
  readonly itemSelect = output<string>();

  protected readonly parsedData = linkedSignal<
    ResourcesList<Person> | undefined,
    ReturnType<typeof parsePeopleList> | undefined
  >({
    source: this.data,
    computation: (source, previous) => {
      if (typeof source === 'undefined') {
        return previous ? previous.value : undefined;
      } else {
        return parsePeopleList(source);
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

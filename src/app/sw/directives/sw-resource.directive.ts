import {
  Component,
  Directive,
  effect,
  inject,
  input,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-sw-resource-loading',
  template: `Loading...`,
})
class LoadingComponent {}

@Component({
  selector: 'app-sw-resource-null',
  template: `-`,
})
class NullComponent {}

interface SwResourceTemplateContext<T> {
  $implicit: NonNullable<T>;
}

const loadingDelay = 500;

@Directive({
  selector: '[appSwResource]',
})
export class SwResourceDirective<T> {
  // Narrow the type of the context using the generic type of the directive.
  static ngTemplateContextGuard<T>(
    dir: SwResourceDirective<T>,
    ctx: unknown,
  ): ctx is SwResourceTemplateContext<T> {
    // As before the guard body is not used at runtime, and included only to avoid
    // TypeScript errors.
    return true;
  }

  readonly appSwResourceOf = input.required<T>();

  private readonly templateRef =
    inject<TemplateRef<SwResourceTemplateContext<T>>>(TemplateRef);

  private readonly viewContainerRef = inject(ViewContainerRef);

  constructor() {
    effect((onDestroy) => {
      const resource = this.appSwResourceOf();

      this.viewContainerRef.clear();

      if (typeof resource === 'undefined') {
        const handler = setTimeout(
          () => this.viewContainerRef.createComponent(LoadingComponent),
          loadingDelay,
        );

        onDestroy(() => clearTimeout(handler));
      } else if (resource === null) {
        this.viewContainerRef.createComponent(NullComponent);
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef, {
          $implicit: resource,
        });
      }
    });
  }
}

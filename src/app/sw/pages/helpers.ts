import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SwPageComponent } from './sw-page/sw-page.component';

export function createSwNavigateFn() {
  const moduleRootRoute = inject(SwPageComponent).activatedRoute;
  const router = inject(Router);

  return (url: URL) => {
    const paths = url.pathname.split('/');

    while (paths[paths.length - 1] === '') {
      paths.pop();
    }

    const navigates = [paths[paths.length - 2], paths[paths.length - 1]];

    router.navigate(navigates, {
      relativeTo: moduleRootRoute,
    });
  };
}

import { CanActivateFn, createUrlTreeFromSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth/services/auth.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (activatedRoute) => {
  return inject(AuthService)
    .checkAuthStatus()
    .pipe(
      map((isLoggedIn$) => {
        return isLoggedIn$
          ? true
          : createUrlTreeFromSnapshot(activatedRoute, ['/','auth', 'login']);
      })
    );
};

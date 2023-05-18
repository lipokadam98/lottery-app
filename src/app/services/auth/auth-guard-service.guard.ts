import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {map, take} from 'rxjs';
import {AuthService} from "./auth.service";

export const canActivate: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getUser().pipe(take(1), map(user => {
    const isAuth = !!user;
    if (isAuth) {
      return true;
    }

    return router.createUrlTree(['/login']);
  }));
};

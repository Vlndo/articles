import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanMatchFn = (route, segments) => {
  const auth: AuthService = inject(AuthService);
  return auth.isLogged || inject(Router).createUrlTree(['/login']);
};

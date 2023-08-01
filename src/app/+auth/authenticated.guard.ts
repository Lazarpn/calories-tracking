import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): boolean | UrlTree {
    let isAuth = false;
    //FIXME: pitanje da li i ovde treba sa next-om na route-params i da li se handla error i ovde?

    this.authService.userRole.subscribe({
      next: (userRole: string) => {
        if (userRole) {
          isAuth = true;
        }
      },
      error: error => {},
    });
    if (isAuth) {
      return this.router.createUrlTree(['/meals']);
    }
    return true;
  }
}

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
    this.authService.userRole.subscribe((userRole: string) => {
      if (userRole) {
        isAuth = true;
      }
    });
    if (isAuth) {
      return this.router.createUrlTree(['/meals']);
    }
    return true;
  }
}

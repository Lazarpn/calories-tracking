import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
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

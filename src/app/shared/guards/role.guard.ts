import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.userRole.pipe(
      map(userRole => {
        const canAccess = userRole === 'Administrator';
        if (canAccess) {
          return true;
        }
        return this.router.createUrlTree(['/meals/meal-list']);
      })
    );
  }
}

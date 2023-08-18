import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Injectable({
  providedIn: 'root',
})
export class EmailNotConfirmedGuard implements CanActivate {
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    const hasEmailConfirmed = this.profileService.user?.emailConfirmed;
    if (hasEmailConfirmed) {
      return this.router.createUrlTree(['/meals']);
    }
    return true;
  }
}

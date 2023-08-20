import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, UrlTree } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Injectable({ providedIn: 'root' })
export class EmailConfirmedResolver implements Resolve<void> {
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  resolve(): void {
    const hasEmailConfirmed = this.profileService.user?.emailConfirmed;
    if (!hasEmailConfirmed) {
      this.router.navigate(['/verify-email']);
    }
  }
}

import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Injectable({ providedIn: 'root' })
export class EmailNotConfirmedResolver implements Resolve<void> {
  constructor(
    private profileService: ProfileService,
    private router: Router
  ) {}

  resolve(): void {
    const hasEmailConfirmed = this.profileService.user?.emailConfirmed;
    if (hasEmailConfirmed) {
      this.router.navigate(['/meals']);
    }
  }
}

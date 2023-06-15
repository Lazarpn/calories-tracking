import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ct-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  role: string;
  userSub: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const role = JSON.parse(localStorage.getItem('roles'));
    if (role) {
      this.role = role;
    }

    this.userSub = this.authService.userRole.subscribe((userRole: string) => {
      this.isAuthenticated = !!userRole;
      if (userRole) {
        this.role = userRole;
      }
    });
  }

  ngOnDestroy(): void {}
  onSignOut() {
    this.authService.signOut();
  }
}

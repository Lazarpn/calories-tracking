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
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      this.role = userData.role;
    }

    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      if (user) {
        this.role = user.role;
      }
    });
  }

  ngOnDestroy(): void {}
  onSignOut() {
    this.authService.signOut();
  }
}

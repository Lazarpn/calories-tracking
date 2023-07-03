import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../+auth/auth.service';

@Component({
  selector: 'ct-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  role: string;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('roles') || null;
    this.isAuthenticated = this.authService.authenticated();

    this.authService.userRole.subscribe((userRole: string) => {
      this.isAuthenticated = this.authService.authenticated();
      this.role = userRole;
    });
  }

  onSignOut() {
    this.authService.signOut();
    this.role = null;
    this.isAuthenticated = false;
  }
}

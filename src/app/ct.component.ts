import { Component, OnInit } from '@angular/core';
import { AuthService } from './+auth/auth.service';

@Component({
  selector: 'ct-root',
  templateUrl: './ct.component.html',
  styleUrls: ['./ct.component.scss'],
})
export class CtComponent implements OnInit {
  title: string = 'Calories Tracking';
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.autoSignIn();
  }
}

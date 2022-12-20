import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isSignInMode: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isSignInMode = !this.isSignInMode;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthResponseModel, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'ct-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isSignInMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  authForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/
        ),
      ]),
    });
  }

  onSwitchMode() {
    this.isSignInMode = !this.isSignInMode;

    if (!this.isSignInMode) {
      this.authForm.addControl('firstName', new FormControl(null));
      this.authForm.addControl('lastName', new FormControl(null));
    } else {
      this.authForm.removeControl('firstName');
      this.authForm.removeControl('lastName');
    }
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;
    let firstName, lastName;

    if (!this.isSignInMode) {
      firstName = this.authForm.value.firstName;
      lastName = this.authForm.value.lastName;
    }

    let authObs: Observable<AuthResponseModel>;
    this.isLoading = true;

    if (this.isSignInMode) {
      authObs = this.authService.signIn(email, password);
    } else {
      authObs = this.authService.signUp(email, password, firstName, lastName);
    }

    authObs.subscribe(
      responseData => {
        this.isLoading = false;
        this.router.navigate(['/meals']);
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    this.authForm.reset();
  }
}

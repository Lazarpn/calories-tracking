import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthResponseModel } from '../shared/models/user/auth-response.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpModel } from '../shared/models/user/sign-up-model';
import { SignInModel } from '../shared/models/user/sign-in-model';

@Component({
  selector: 'ct-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @HostBinding('class.display-none') isLoading: boolean = false;
  isSignInMode: boolean = true;
  authForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/),
    ]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {}

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
    this.isLoading = true;
    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    const signInModel: SignInModel = {
      email: email,
      password: password,
    };

    const signUpModel: SignUpModel = {
      email: email,
      password: password,
      firstName: '',
      lastName: '',
    };

    if (!this.isSignInMode) {
      signUpModel.firstName = this.authForm.value.firstName;
      signUpModel.lastName = this.authForm.value.lastName;
    }

    let authObs: Observable<AuthResponseModel>;

    if (this.isSignInMode) {
      authObs = this.authService.signIn(signInModel);
    } else {
      authObs = this.authService.signUp(signUpModel);
    }

    authObs.subscribe({
      next: _ => {
        this.router.navigate(['/meals']).then(() => (this.isLoading = false));
      },
      error: _ => {
        this.isLoading = false;
      },
    });

    this.authForm.reset();
  }

  forgotPassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route });
  }
}

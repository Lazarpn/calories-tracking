import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthResponseModel } from '../shared/models/user/auth-response.model';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpModel } from '../shared/models/user/sign-up-model';
import { SignInModel } from '../shared/models/user/sign-in-model';
import { ExceptionDetail } from '../shared/models/exception-detail';
import { PASSWORD_PATTERN } from '../shared/constants';
import { UtilityService } from '../shared/utility.service';
import { TranslationMessage } from '../shared/models/translation-message';

@Component({
  selector: 'ct-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  @HostBinding('class.display-none') isLoading: boolean = false;
  isSignInMode: boolean = true;
  errorMessagesEmail: TranslationMessage[] = [];
  errorMessagesPassword: TranslationMessage[] = [];
  authForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(PASSWORD_PATTERN)]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private utilityService: UtilityService
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
    this.errorMessagesEmail = [];
    this.errorMessagesPassword = [];

    if (!this.authForm.valid) {
      if (!this.authForm.controls['email'].valid) {
        this.errorMessagesEmail.push(this.utilityService.errorEmail());
      }

      if (!this.authForm.controls['password'].valid) {
        this.errorMessagesPassword = this.errorMessagesPassword.concat(
          this.utilityService.checkPassword(this.authForm.controls['password'].value)
        );
      }

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
      error: (errors: ExceptionDetail[]) => {
        this.errorMessagesEmail = this.utilityService.getErrorMessages(errors);
        this.isLoading = false;
      },
    });

    this.authForm.reset();
  }

  forgotPassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route });
  }
}

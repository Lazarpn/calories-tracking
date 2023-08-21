import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseModel } from '../models/user/auth-response.model';
import { ForgotPasswordModel } from '../models/user/forgot-password-model';
import { ResetPasswordModel } from '../models/user/reset-password-model';
import { SignUpModel } from '../models/user/sign-up-model';
import { SignInModel } from '../models/user/sign-in-model';
import { LS_USER_LANGUAGE, LS_USER_ROLES, LS_USER_TOKEN } from '../constants';
import { UserConfirmEmailModel } from '../models/user/user-confirm-email-model';
import { ResentEmailResponseModel } from '../models/user/resent-email-response-model';
import { ChangeEmailModel } from '../models/user/change-email-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: number;
  private url: string = `${environment.url}/api`;
  userRole = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  resendVerificationEmail(): Observable<ResentEmailResponseModel> {
    return this.http.put<ResentEmailResponseModel>(`${this.url}/accounts/verify-email/resend`, {});
  }

  changeVerificationEmail(model: ChangeEmailModel): Observable<void> {
    return this.http.put<void>(`${this.url}/accounts/verify-email/change`, model);
  }

  verifyEmail(model: UserConfirmEmailModel): Observable<void> {
    return this.http.put<void>(`${this.url}/accounts/verify-email`, model);
  }

  resetPassword(model: ResetPasswordModel): Observable<void> {
    return this.http.put<void>(`${this.url}/accounts/password/reset`, model);
  }

  forgotPassword(model: ForgotPasswordModel): Observable<void> {
    return this.http.put<void>(`${this.url}/accounts/password/forgot`, model);
  }

  signUp(model: SignUpModel): Observable<AuthResponseModel> {
    return this.http
      .post<AuthResponseModel>(`${this.url}/accounts/register`, model)
      .pipe(tap(resData => this.handleAuthentication(resData)));
  }

  signIn(model: SignInModel): Observable<AuthResponseModel> {
    return this.http
      .post<AuthResponseModel>(`${this.url}/accounts/login`, model)
      .pipe(tap(resData => this.handleAuthentication(resData)));
  }

  autoSignIn() {
    const token = localStorage.getItem(LS_USER_TOKEN);
    if (!token) {
      return;
    }
    const parsedToken = this.parseJwt(token);
    const expirationTime = new Date(parsedToken.exp * 1000);
    if (new Date() > expirationTime) {
      return;
    }
    const expirationDuration = expirationTime.getTime() - new Date().getTime();
    this.userRole.next(parsedToken.roles);
    this.autoSignOut(expirationDuration);
  }

  autoSignOut(expirationDuration: number) {
    this.tokenExpirationTimer = window.setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  signOut() {
    const language = localStorage.getItem(LS_USER_LANGUAGE);
    localStorage.clear();
    localStorage.setItem(LS_USER_LANGUAGE, language);
    this.userRole.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    location.replace(environment.appAuthUrl);
  }

  authenticated(): boolean {
    return localStorage.getItem(LS_USER_TOKEN) != null;
  }

  private handleAuthentication(authResponse: AuthResponseModel) {
    const parsedToken = this.parseJwt(authResponse.token);
    const expirationTime = new Date(parsedToken.exp * 1000);
    const expirationDuration = expirationTime.getTime() - new Date().getTime();
    localStorage.setItem(LS_USER_TOKEN, authResponse.token);
    localStorage.setItem(LS_USER_ROLES, parsedToken.roles);
    this.userRole.next(parsedToken.roles);
    this.autoSignOut(expirationDuration);
  }

  private parseJwt(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }
}

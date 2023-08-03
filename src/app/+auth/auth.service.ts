import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseModel } from '../shared/models/user/auth-response.model';
import { ForgotPasswordModel } from '../shared/models/user/forgot-password-model';
import { ResetPasswordModel } from '../shared/models/user/reset-password-model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SignUpModel } from '../shared/models/user/sign-up-model';
import { SignInModel } from '../shared/models/user/sign-in-model';
import { ExceptionDetail } from '../shared/models/exception-detail';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: number;
  private url: string = `${environment.url}/api`;
  userRole = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

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
    const token = localStorage.getItem('token');
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
    const language = localStorage.getItem('language');
    localStorage.clear();
    localStorage.setItem('language', language);
    this.userRole.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    location.replace(environment.homeUrl);
  }

  authenticated(): boolean {
    return localStorage.getItem('token') != null;
  }

  private handleAuthentication(authResponse: AuthResponseModel) {
    const parsedToken = this.parseJwt(authResponse.token);
    const expirationTime = new Date(parsedToken.exp * 1000);
    const expirationDuration = expirationTime.getTime() - new Date().getTime();
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('roles', parsedToken.roles);
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

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponseModel } from '../shared/models/user/auth-response.model';
import { ForgotPasswordModel } from '../shared/models/user/forgot-password-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: number;
  url: string = `${environment.url}/api`;
  userRole = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  resetPassword(model: ForgotPasswordModel) {
    return this.http.put<void>(`${this.url}/password/forgot`, model);
  }

  signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.http
      .post<AuthResponseModel>(this.url + '/accounts/register', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(resData))
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponseModel>(this.url + '/accounts/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(resData))
      );
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
    localStorage.clear();
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

  FIXME: 'snackbar';

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    errorMessage = errorRes.error;

    return throwError(errorMessage);
  }

  private parseJwt(token) {
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

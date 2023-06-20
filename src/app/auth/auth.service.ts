import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

export interface AuthResponseModel {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer;
  url: string = environment.url + '/api';
  userRole = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient, private router: Router) {}

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
    const expirationDuration = expirationTime.getTime() - new Date().getTime();
    this.userRole.next(parsedToken.roles);
    this.autoSignOut(expirationDuration);
  }

  autoSignOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  signOut() {
    this.userRole.next(null);
    localStorage.clear();
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
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

  FIXME: 'Jel mi ovaj error handlig vise ne treba, jel je ono u interceptoru na globalnom nivou?';

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

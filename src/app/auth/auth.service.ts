import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  userId: string;
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  url: string = environment.url + '/api';
  userRole = new BehaviorSubject<string>(null);
  userId: string;

  private tokenExpirationTimer;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.http
      .post<AuthResponseData>(this.url + '/accounts/register', {
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
      .post<AuthResponseData>(this.url + '/accounts/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap(resData => this.handleAuthentication(resData))
      );
  }

  autoSignIn() {
    const userData: {
      email: string;
      id: string;
      role: string;
      firstName: string;
      lastName: string;
      caloriesPreference?: number;
      _token: string;
      _tokenExpirationDate: Date;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    // const loadedUser = new User(
    //   userData.email,
    //   userData.firstName,
    //   userData.lastName,
    //   userData.id,
    //   userData.role,
    //   userData.caloriesPreference,
    //   userData._token,
    //   new Date(userData._tokenExpirationDate)
    // );
    // if (loadedUser.token) {
    //   this.userId = loadedUser.id;
    //   this.user.next(loadedUser);
    //   const expirationDuration =
    //     new Date(userData._tokenExpirationDate).getTime() -
    //     new Date().getTime();
    //   this.autoSignOut(expirationDuration);
    // }
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

  private handleAuthentication(authResponse: AuthResponseData) {
    const parsedToken = this.parseJwt(authResponse.token);

    // console.log(parsedToken);
    // const user = new User(
    //   authResponse.user.email,
    //   authResponse.user.firstName,
    //   authResponse.user.lastName,
    //   authResponse.userId,
    //   parsedToken.roles,
    //   authResponse.user.caloriesPreference,
    //   authResponse.token,
    //   parsedToken.exp
    // );
    // console.log(user);
    //fix
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);
    localStorage.setItem('token', authResponse.token);
    localStorage.setItem('roles', parsedToken.roles);
    // this.userRole.next(parsedToken.roles);
    // const expirationDuration =
    // new Date(parsedToken.exp).getTime() - new Date().getTime();
    // this.autoSignOut(expirationDuration);
  }

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

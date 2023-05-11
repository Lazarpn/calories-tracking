import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

export interface AuthResponseData {
  token: string;
  userId: string;
  userInfo: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  url: string = environment.url + '/api';
  user = new BehaviorSubject<User>(null);
  userId: string;
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string, firstName: string, lastName: string) {
    return this.http
      .post<AuthResponseData>(this.url + '/Account/register', {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleRegistration(
            email,
            firstName,
            lastName,
            resData.userId,
            resData.token
          );
        })
      );
  }

  signIn(email: string, password: string) {
    console.log('radi ovde');
    return this.http
      .post<AuthResponseData>(this.url + '/Account/login', {
        email: email,
        password: password,
      })
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleLogin(
            email,
            resData.userId,
            resData.token,
            resData.userInfo
          );
        })
      );
  }

  autoSignIn() {
    const userData: {
      email: string;
      id: string;
      firstName: string;
      lastName: string;
      caloriesPreference?: number;
      userPhoto: any;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.firstName,
      userData.lastName,
      userData.id,
      userData.caloriesPreference,
      userData.userPhoto,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.userId = loadedUser.id;
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoSignOut(expirationDuration);
    }
  }

  autoSignOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  signOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['/auth']);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(user: User) {
    this.userId = user.id;
    console.log(this.userId);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
  }

  private handleRegistration(
    email: string,
    firstName: string,
    lastName: string,
    userId: string,
    token: string
  ) {
    // CALCULATE TIMEOUT
    const parsedToken = this.parseJwt(token);
    const expirationTime = new Date(Date.now() + parsedToken.exp).getTime();
    const user = new User(
      email,
      firstName,
      lastName,
      userId,
      null,
      null,
      token,
      new Date(expirationTime)
    );

    this.handleAuthentication(user);
  }

  private handleLogin(
    email: string,
    userId: string,
    token: string,
    userInfo: any
  ) {
    const parsedToken = this.parseJwt(token);
    const expirationTime = new Date(Date.now() + parsedToken.exp).getTime();
    const newUser = new User(
      email,
      userInfo.firstName,
      userInfo.lastName,
      userId,
      userInfo.caloriesPreference,
      userInfo.userPhoto,
      token,
      new Date(expirationTime)
    );

    this.handleAuthentication(newUser);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured';
    if (!errorRes.error && !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage =
          'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage =
          'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage =
          'The password is invalid or the user does not have a password.';
        break;
      case 'USER_DISABLED':
        errorMessage =
          ' The user account has been disabled by an administrator.';
        break;
    }

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

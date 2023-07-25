import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PreloadAllModules } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url: string = environment.url + '/api';
  user: User = null;
  preferenceCaloriesChanged = new Subject<number>();
  userPhotoChanged = new Subject<any>();
  userPhoto: string;

  constructor(private http: HttpClient) {}

  getUser(): User {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }

  getUserInfo() {
    return {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
    };
  }

  updateUserInfo(firstName: string, lastName: string) {
    this.http
      .put<void>(this.url + `/users/me`, {
        firstName: firstName,
        lastName: lastName,
      })
      .subscribe(_ => {
        this.user.firstName = firstName;
        this.user.lastName = lastName;
      });
  }

  getUserCalories(): number {
    return this.user.caloriesPreference;
  }

  updateUserCalories(caloriesPreference: number) {
    this.http
      .put<void>(this.url + '/users/me/calories', {
        caloriesPreference: caloriesPreference,
      })
      .subscribe(() => {
        this.user.caloriesPreference = caloriesPreference;
      });
  }
}

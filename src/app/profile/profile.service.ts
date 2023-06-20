import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../auth/user.model';
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

  // FIXME: 'Na koji nacin treba da vrsim cuvanje i prosledjivanje podataka iz servisa drugim komponentama i obrnuto';

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

  setUserInfo(firstName: string, lastName: string) {
    this.http
      .put(this.url + `/users/me`, {
        firstName: firstName,
        lastName: lastName,
      })
      .subscribe(() => {
        this.user.firstName = firstName;
        this.user.lastName = lastName;
      });
  }

  getUserCalories(): number {
    return this.user.caloriesPreference;
  }

  setUserCalories(caloriesPreference: number) {
    this.http
      .put(this.url + '/users/me/calories', {
        caloriesPreference: caloriesPreference,
      })
      .subscribe(() => {
        this.user.caloriesPreference = caloriesPreference;
      });
  }

  getUserPhoto() {}

  setUserPhoto() {}

  changeCalories(caloriesPreference: number) {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    user.caloriesPreference = caloriesPreference;
    localStorage.setItem('userData', JSON.stringify(user));
    this.http
      .put(this.url + `/users/me/calories`, {
        caloriesPreference: caloriesPreference,
      })
      .subscribe(res => {
        this.preferenceCaloriesChanged.next(caloriesPreference);
      });
  }

  // FIXME: 'Menjanje nacina cuvanje slika';

  getPhoto() {
    return this.userPhoto;
  }

  fetchPhoto() {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    this.http
      .get(this.url + `/users/me/photo`)
      .subscribe((res: { id: string; userPhoto: string }) => {
        console.log(res);
        this.userPhotoChanged.next(res.userPhoto);
      });
  }

  uploadPhoto(base64) {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    this.http
      .put(this.url + `/users/me/photo`, {
        userPhoto: base64,
      })
      .subscribe(res => {
        console.log(res);
        // console.log(res.userPhoto);
        // this.userPhoto = res.userPhoto;
        // this.userPhotoChanged.next(this.userPhoto);
      });
  }
}

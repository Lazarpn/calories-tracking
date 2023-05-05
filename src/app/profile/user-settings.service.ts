import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { User } from '../auth/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  url: string = environment.url + '/api';
  userInfoChanged = new Subject<{}>();
  userPhotoChanged = new Subject<any>();
  userPhoto: any;
  caloriesPreference: boolean;
  preferenceCalories: number;

  constructor(
    private dataStorageService: DataStorageService,
    private http: HttpClient
  ) {}

  changeUserInfo(firstName: string, lastName: string) {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    user.firstName = firstName;
    user.lastName = lastName;
    localStorage.setItem('userData', JSON.stringify(user));

    this.http
      .put(this.url + `/Account/${user.id}`, {
        id: user.id,
        firstName: firstName,
        lastName: lastName,
      })
      .subscribe((res) => {});
  }

  changeCalories(id: string, caloriesPreference: number) {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    user.caloriesPreference = caloriesPreference;
    localStorage.setItem('userData', JSON.stringify(user));

    this.http
      .put(this.url + `/Account/calories/${id}`, {
        id: id,
        caloriesPreference: caloriesPreference,
      })
      .subscribe((res) => {});
  }

  uploadPhoto(base64) {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    user.userPhoto = base64;
    localStorage.setItem('userData', JSON.stringify(user));
    this.http
      .put(this.url + `/Account/photo/${user.id}`, {
        id: user.id,
        userPhoto: base64,
      })
      .subscribe((res) => {
        console.log('ord');
      });
  }
}

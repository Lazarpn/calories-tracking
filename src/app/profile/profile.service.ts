import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MealsDataService } from '../meals/meals-data.service';
import { User } from '../auth/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url: string = environment.url + '/api';
  preferenceCaloriesChanged = new Subject<number>();
  userPhotoChanged = new Subject<any>();
  userPhoto: string;

  constructor(private http: HttpClient) {}

  changeUserInfo(firstName: string, lastName: string) {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    user.firstName = firstName;
    user.lastName = lastName;
    localStorage.setItem('userData', JSON.stringify(user));

    this.http
      .put(this.url + `/User/${user.id}`, {
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
      .put(this.url + `/User/calories/${id}`, {
        id: id,
        caloriesPreference: caloriesPreference,
      })
      .subscribe((res) => {
        this.preferenceCaloriesChanged.next(caloriesPreference);
      });
  }

  getPhoto() {
    return this.userPhoto;
  }

  fetchPhoto() {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    this.http
      .get(this.url + `/User/photo/${user.id}`)
      .subscribe((res: { id: string; userPhoto: string }) => {
        console.log(res);
        this.userPhotoChanged.next(res.userPhoto);
      });
  }

  uploadPhoto(base64) {
    const user: User = JSON.parse(localStorage.getItem('userData'));
    this.http
      .put(this.url + `/User/photo/${user.id}`, {
        id: user.id,
        userPhoto: base64,
      })
      .subscribe((res) => {
        console.log(res);
        // console.log(res.userPhoto);
        // this.userPhoto = res.userPhoto;
        // this.userPhotoChanged.next(this.userPhoto);
      });
  }
}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../shared/models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserPhotoUploadModel } from '../shared/models/user/user-photo-upload-model';
import { UtilityService } from '../shared/utility.service';
import { UserPhotoModel } from '../shared/models/user/user-photo-model';
import { UserUpdateModel } from '../shared/models/user/user-update-model';
import { UserCaloriesModel } from '../shared/models/user/user-calories-model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  url: string = `${environment.url}/api`;
  user: User = null;
  userPhoto: string = null;
  userPhotoChanged = new Subject<string>();
  preferenceCaloriesChanged = new Subject<number>();

  constructor(
    private http: HttpClient,
    private utilityService: UtilityService,
    private snackBar: MatSnackBar
  ) {}

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

  updateUserInfo(model: UserUpdateModel) {
    this.http.put<void>(`${this.url}/users/me`, model).subscribe({
      next: _ => {
        this.user.firstName = model.firstName;
        this.user.lastName = model.lastName;
      },
    });
  }

  getUserCalories(): number {
    return this.user.caloriesPreference;
  }

  updateUserCalories(model: UserCaloriesModel) {
    this.http.put<void>(`${this.url}/users/me/calories`, model).subscribe({
      next: _ => {
        this.user.caloriesPreference = model.caloriesPreference;
      },
      // FIXME:error kad vidim sa Milosem svuda u servisu
    });
  }

  setUserPhoto(url: string) {
    this.userPhoto = url;
    this.userPhotoChanged.next(url);
  }

  getUserPhoto() {
    this.http.get<UserPhotoModel>(`${this.url}/users/me/photo`).subscribe({
      next: model => {
        this.userPhoto = model.fileUrl;
        this.userPhotoChanged.next(model.fileUrl);
      },
    });
  }

  uploadUserPhoto(model: UserPhotoUploadModel) {
    const formData = this.utilityService.createFormData(model);
    this.http.put<UserPhotoModel>(`${this.url}/users/me/photo`, formData).subscribe({
      next: model => {
        this.setUserPhoto(model.fileUrl);
      },
      error: error => {
        this.snackBar.open("We couldn't upload your photo, try again.", '✖️');
      },
    });
  }
}

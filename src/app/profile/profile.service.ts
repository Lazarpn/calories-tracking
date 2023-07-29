import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../shared/models/user/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PreloadAllModules } from '@angular/router';
import { UserPhotoUploadModel } from '../shared/models/user/user-photo-upload-model';
import { UtilityService } from '../shared/utility.service';
import { UserPhotoModel } from '../shared/models/user/user-photo-model';

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
    private utilityService: UtilityService
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

  updateUserInfo(firstName: string, lastName: string) {
    this.http
      .put<void>(`${this.url}/users/me`, {
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
      .put<void>(`${this.url}/users/me/calories`, {
        caloriesPreference: caloriesPreference,
      })
      .subscribe(() => {
        this.user.caloriesPreference = caloriesPreference;
      });
  }

  getUserPhoto() {
    this.http
      .get<UserPhotoModel>(`${this.url}/users/me/photo`)
      .subscribe(model => {
        this.userPhoto = model.fileUrl;
        this.userPhotoChanged.next(model.fileUrl);
      });
  }

  uploadUserPhoto(model: UserPhotoUploadModel) {
    const formData = this.utilityService.createFormData(model);
    return this.http.put<UserPhotoModel>(
      `${this.url}/users/me/photo`,
      formData
    );
  }
}

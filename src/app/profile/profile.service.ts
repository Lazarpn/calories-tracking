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
      // FIXME:error kad vidim sa Milosem
    });
  }

  getUserPhoto() {
    this.http.get<UserPhotoModel>(`${this.url}/users/me/photo`).subscribe({
      next: model => {
        this.userPhoto = model.fileUrl;
        this.userPhotoChanged.next(model.fileUrl);
      },
    });
  }

  uploadUserPhoto(model: UserPhotoUploadModel): Observable<UserPhotoModel> {
    const formData = this.utilityService.createFormData(model);
    return this.http.put<UserPhotoModel>(`${this.url}/users/me/photo`, formData);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  caloriesPreferenceChanged = new Subject<{
    preferenceApplied: boolean;
    caloriesNumber?: number;
  }>();
  userInfoChanged = new Subject<{}>();
  caloriesPreference: boolean;
  preferenceCalories: number;
  name: string;
  surname: string;
  constructor(private dataStorageService: DataStorageService) {}

  onChangeCaloriesPreference(preference: boolean, calories?: number) {
    this.caloriesPreference = preference;
    this.preferenceCalories = calories;
    this.caloriesPreferenceChanged.next({
      preferenceApplied: this.caloriesPreference,
      caloriesNumber: this.preferenceCalories,
    });
  }

  onSetUserInfo(name: string, surname: string) {
    this.name = name;
    this.surname = surname;
    this.dataStorageService.storeUserInfo({
      name: this.name,
      surname: this.surname,
    });
  }

  onGetUserInfo() {
    this.dataStorageService
      .getUserInfo()
      .subscribe((userInfo: { name: string; surname: string }) => {
        this.name = userInfo.name;
        this.surname = userInfo.surname;
        this.userInfoChanged.next({
          name: this.name,
          surname: this.surname,
        });
      });
  }

  onSetUserSettings() {
    this.dataStorageService.storeUserSettings({
      caloriesPreferenceApplied: this.caloriesPreference,
      caloriesNumber: this.preferenceCalories,
    });
  }

  onGetUserSettings() {
    this.dataStorageService
      .getUserSettings()
      .subscribe(
        (settings: {
          caloriesPreferenceApplied: boolean;
          caloriesNumber: number;
        }) => {
          this.caloriesPreference = settings.caloriesPreferenceApplied;
          this.preferenceCalories = settings.caloriesNumber;
          this.caloriesPreferenceChanged.next({
            preferenceApplied: this.caloriesPreference,
            caloriesNumber: this.preferenceCalories,
          });
        }
      );
  }
}

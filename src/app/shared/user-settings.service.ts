import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  caloriesPreferenceChanged = new Subject<boolean>();
  caloriesPreference: boolean;
  constructor() {}

  onChangeCaloriesPreference(preference: boolean) {
    this.caloriesPreference = preference;
    this.caloriesPreferenceChanged.next(this.caloriesPreference);
  }
}

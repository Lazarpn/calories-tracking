import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../../shared/user-settings.service';

@Component({
  selector: 'app-meal-expected-calories',
  templateUrl: './meal-expected-calories.component.html',
  styleUrls: ['./meal-expected-calories.component.scss'],
})
export class MealExpectedCaloriesComponent implements OnInit {
  caloriesPreferenceApplied: boolean;
  constructor(private userSettings: UserSettingsService) {}

  ngOnInit(): void {
    this.caloriesPreferenceApplied = this.userSettings.caloriesPreference;
    this.userSettings.caloriesPreferenceChanged.subscribe(
      (preference: boolean) => {
        this.caloriesPreferenceApplied = preference;
      }
    );
  }
}

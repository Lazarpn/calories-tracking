import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSettingsService } from '../../../profile/user-settings.service';
import { Subscription } from 'rxjs';
import { MealsService } from '../../meals.service';
import { Filter } from '../filter.model';

@Component({
  selector: 'app-meal-expected-calories',
  templateUrl: './meal-expected-calories.component.html',
  styleUrls: ['./meal-expected-calories.component.scss'],
})
export class MealExpectedCaloriesComponent implements OnInit, OnDestroy {
  caloriesPreferenceApplied: boolean;
  preferenceCalories: number;
  subscription: Subscription;
  progressBar: number;
  caloriesHad: number;
  caloriesLeft: number;
  constructor(
    private userSettings: UserSettingsService,
    private mealsService: MealsService
  ) {}

  ngOnInit(): void {
    this.mealsService.todaysCaloriesChanged.subscribe((calories: number) => {
      console.log(calories);
      this.caloriesHad = calories;
      this.calculateCalories();
    });

    this.subscription = this.userSettings.caloriesPreferenceChanged.subscribe(
      (settings: { preferenceApplied: boolean; caloriesNumber: number }) => {
        this.caloriesPreferenceApplied = settings.preferenceApplied;
        this.preferenceCalories = settings.caloriesNumber;
        this.calculateCalories();
      }
    );

    this.caloriesPreferenceApplied = this.userSettings.caloriesPreference;
    this.preferenceCalories = this.userSettings.preferenceCalories;
    this.mealsService.getTodaysCalories();
  }

  calculateCalories() {
    // FIX THIS
    // console.log(this.caloriesHad, this.preferenceCalories);
    this.caloriesLeft = this.preferenceCalories - this.caloriesHad;
    // console.log(this.caloriesLeft);
    if (this.caloriesHad && this.preferenceCalories) {
      this.progressBar = +(
        (this.caloriesHad * 100) /
        this.preferenceCalories
      ).toFixed(0);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

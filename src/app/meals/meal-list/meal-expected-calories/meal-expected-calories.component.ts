import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserSettingsService } from '../../../profile/user-settings.service';
import { Subscription } from 'rxjs';
import { MealsService } from '../../meals.service';
import { Filter } from '../filter.model';
import { User } from 'src/app/auth/user.model';

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
    const user: User = JSON.parse(localStorage.getItem('userData'));
    if (user.caloriesPreference) {
      this.caloriesPreferenceApplied = true;
      this.preferenceCalories = user.caloriesPreference;
    }
    this.caloriesHad = this.mealsService.getTodaysCalories();

    this.userSettings.preferenceCaloriesChanged.subscribe(
      (calories: number) => {
        this.caloriesPreferenceApplied = true;
        this.preferenceCalories = calories;
      }
    );

    this.mealsService.todaysCaloriesChanged.subscribe((calories: number) => {
      this.caloriesHad = calories;
      this.calculateCalories();
    });
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

  ngOnDestroy(): void {}
}

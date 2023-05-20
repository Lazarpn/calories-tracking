import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../../profile/profile.service';
import { Subscription } from 'rxjs';
import { MealsService } from '../meals.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'ct-meal-expected-calories',
  templateUrl: './meal-expected-calories.component.html',
  styleUrls: ['./meal-expected-calories.component.scss'],
})
export class MealExpectedCaloriesComponent implements OnInit, OnDestroy {
  caloriesPreferenceApplied: boolean;
  caloriesPreference: number;
  subscription: Subscription;
  progressBar: number;
  caloriesHad: number;
  caloriesLeft: number;
  numberOfCalories: number;
  numberOfMeals: number;
  constructor(
    private profileService: ProfileService,
    private mealsService: MealsService
  ) {}

  ngOnInit(): void {
    this.mealsService.numberOfCaloriesMealsChanged.subscribe((changes) => {
      this.numberOfCalories = changes.numberOfCalories;
      this.numberOfMeals = changes.numberOfMeals;
    });
    this.numberOfCalories = this.mealsService.numberOfCalories;
    this.numberOfMeals = this.mealsService.numberOfMeals;
    //////
    this.caloriesHad = this.mealsService.getTodaysCalories();
    const user: User = JSON.parse(localStorage.getItem('userData'));
    if (user.caloriesPreference) {
      this.caloriesPreferenceApplied = true;
      this.caloriesPreference = user.caloriesPreference;
      this.calculateCalories();
    }

    this.profileService.preferenceCaloriesChanged.subscribe(
      (calories: number) => {
        this.caloriesPreferenceApplied = true;
        this.caloriesPreference = calories;
        this.calculateCalories();
      }
    );

    this.mealsService.todaysCaloriesChanged.subscribe((calories: number) => {
      this.caloriesHad = calories;
      this.calculateCalories();
    });
  }

  calculateCalories() {
    this.caloriesLeft = this.caloriesPreference - this.caloriesHad;
    if (this.caloriesHad && this.caloriesPreference) {
      this.progressBar = +(
        (this.caloriesHad * 100) /
        this.caloriesPreference
      ).toFixed(0);
    }
  }

  ngOnDestroy(): void {}
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfileService } from '../../shared/services/profile.service';
import { Subscription } from 'rxjs';
import { MealsService } from '../../shared/services/meals.service';

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
  totalCalories: number;
  totalMeals: number;
  todaysCalories: number;
  todaysCaloriesLeft: number;
  todaysMeals: number;
  constructor(
    private profileService: ProfileService,
    private mealsService: MealsService
  ) {}

  ngOnInit(): void {
    this.mealsService.todaysCaloriesChanged.subscribe(calories => {
      this.todaysCalories = calories;
      this.calculateCalories();
    });

    this.mealsService.todaysMealsChanged.subscribe(meals => {
      this.todaysMeals = meals;
      this.calculateCalories();
    });

    this.mealsService.totalMealsChanged.subscribe(meals => {
      this.totalMeals = meals;
    });

    this.mealsService.totalCaloriesChanged.subscribe(calories => {
      this.totalCalories = calories;
      this.calculateCalories();
    });

    this.todaysCalories = this.mealsService.getTodaysCalories();
    this.todaysMeals = this.mealsService.getTodaysMeals();
    this.totalCalories = this.mealsService.getTotalCalories();
    this.totalMeals = this.mealsService.getTotalMeals();
    this.todaysCalories = this.mealsService.getTodaysCalories();
    this.caloriesPreference = this.profileService.getUserCalories();

    if (this.caloriesPreference && this.caloriesPreference > 0) {
      this.caloriesPreferenceApplied = true;
      this.calculateCalories();
    }
  }

  calculateCalories() {
    this.todaysCaloriesLeft = this.caloriesPreference - this.todaysCalories;
    if (this.todaysCalories && this.caloriesPreference) {
      this.progressBar = +((this.todaysCalories * 100) / this.caloriesPreference).toFixed(0);
    } else {
      this.progressBar = 0;
    }
  }

  ngOnDestroy(): void {}
}

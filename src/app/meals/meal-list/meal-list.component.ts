import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meal } from '../meal.model';
import { MealsService } from '../meals.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent implements OnInit, OnDestroy {
  meals: Meal[] = [];
  subscription: Subscription;
  subscription2: Subscription;

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.subscription = this.mealsService.mealsChanged.subscribe(
      (meals: Meal[]) => {
        this.meals = meals;
      }
    );

    this.meals = this.mealsService.getMeals();
  }

  onMealAdd() {
    this.mealsService.mealAdd({
      mealName: '',
      calories: 0,
      date: new Date(),
      time: 0,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

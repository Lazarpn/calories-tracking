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
    const date = new Date();
    const formatedDate = new Intl.DateTimeFormat(navigator.language, {
      day: '2-digit',
      month: 'short',
      year: undefined,
    }).format(date);

    const formatedTime = new Intl.DateTimeFormat(navigator.language, {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);

    console.log(formatedTime);

    this.mealsService.mealAdd({
      mealName: '',
      calories: 0,
      date: formatedDate,
      time: formatedTime,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

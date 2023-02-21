import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal } from '../meal.model';
import { MealsService } from '../meals.service';
import { CanComponentDeactivate } from './meal/can-deactivate-guard.service';
import { Filter } from './filter.model';
import { UserSettingsService } from '../../profile/user-settings.service';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  meals: Meal[] = [];
  subscription: Subscription;
  changesSaved: boolean = true;

  constructor(
    private mealsService: MealsService,
    private userSettingsService: UserSettingsService
  ) {}

  onChangesSaved(event: boolean) {
    this.changesSaved = event;
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.changesSaved) {
      return confirm('Are you sure you want to leave?');
    } else {
      return true;
    }
  }

  ngOnInit(): void {
    this.subscription = this.mealsService.mealsChanged.subscribe(
      (meals: Meal[]) => {
        this.meals = meals;
      }
    );

    this.meals = this.mealsService.getMeals();
    this.userSettingsService.onGetUserSettings();
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
      hour12: false,
    }).format(date);

    console.log(formatedTime);

    console.log(formatedTime);

    this.mealsService.mealAdd({
      mealName: '',
      calories: 0,
      date: formatedDate,
      time: formatedTime,
    });
  }

  onFilterApplied(event) {
    this.mealsService.filterMeals(event);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { Meal } from '../shared/models/meal/meal.model';
import { MealsDataService } from './meals-data.service';
import { MealsService } from './meals.service';
import { MealDateFilter } from '../shared/models/meal/meal-date-filter.model';
import { CanComponentDeactivate } from '../shared/can-deactivate-meals.guard';

@Component({
  selector: 'ct-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent implements OnInit, CanComponentDeactivate {
  filterApplied: boolean = false;
  mealsFetched: boolean = false;
  meals: Meal[] = [];

  constructor(
    private mealsService: MealsService,
    private mealsDataService: MealsDataService
  ) {}

  canDeactivate(): boolean {
    const changesSaved = this.mealsService.mealChangesSaved;
    if (!changesSaved) {
      return confirm("Are you sure you want to leave? Changes won't be saved!");
    }

    return changesSaved;
  }

  ngOnInit(): void {
    this.meals = this.mealsService.getMeals();
    this.mealsService.mealsChanged.subscribe(meals => {
      this.meals = meals;
      this.mealsFetched = true;
    });

    if (this.meals.length === 0) {
      this.mealsDataService.getMeals();
    }
  }

  onMealAdd() {
    this.mealsDataService.createMeal();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onFilterApplied(filter: MealDateFilter) {
    const isFilterEmpty = Object.values(filter).every(value => value === '');
    this.filterApplied = !isFilterEmpty;
    this.mealsService.filterMeals(filter);
  }

  ngOnDestroy(): void {}
}

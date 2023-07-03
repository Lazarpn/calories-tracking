import { Injectable } from '@angular/core';
import { MealDateFilter } from './models/meal/meal-date-filter.model';
import { Meal } from './models/meal/meal.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  filterMeals(filter: MealDateFilter, meals: Meal[]): Meal[] {
    let filteredMeals: Meal[];
    filteredMeals = meals.filter(
      meal => meal.date >= filter.dateStart && meal.date <= filter.dateEnd
    );
    return filteredMeals;
  }
}

import { Injectable } from '@angular/core';
import { Filter } from '../meals/meal-list/filter.model';
import { Meal } from '../meals/meal.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  filterMeals(filter: Filter, meals: Meal[]) {}
}

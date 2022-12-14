import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meal } from './meal.model';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({ providedIn: 'root' })
export class MealsService {
  mealsChanged = new Subject<Meal[]>();
  private meals: Meal[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  fetchMeals() {
    // this.dataStorageService.getMeals().subscribe((meals) => {
    //   this.meals = meals;
    // });
    return this.dataStorageService.getMeals();
  }

  getMeals() {
    if (this.meals.length === 0) {
      this.fetchMeals().subscribe((meals) => {
        if (meals) {
          this.meals = meals;
          this.mealsChanged.next(this.meals);
        } else {
          this.meals = [];
        }
      });
    }
    return this.meals.slice();
  }

  getMeal(meal: Meal) {
    return this.meals.indexOf(meal);
  }

  mealAdd(meal: Meal) {
    this.meals.push(meal);
    this.mealsChanged.next(this.meals.slice());
    this.dataStorageService.storeMeals(this.meals);
  }

  mealUpdate(index: number, newMeal: Meal) {
    this.meals[index] = newMeal;
    this.mealsChanged.next(this.meals.slice());
    this.dataStorageService.storeMeals(this.meals);
    console.log(this.meals);
  }

  mealDelete(id: number) {
    this.meals.splice(id, 1);
    this.mealsChanged.next(this.meals.slice());
    this.dataStorageService.storeMeals(this.meals);
  }

  // mealsUpdate() {}
}

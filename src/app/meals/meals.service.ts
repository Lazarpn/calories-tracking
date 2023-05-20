import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meal } from './meal.model';
import { Filter } from './meal-list/filter.model';
import { FilterService } from '../shared/filter.service';

@Injectable({ providedIn: 'root' })
export class MealsService {
  private meals: Meal[] = [];
  mealsChanged = new Subject<Meal[]>();
  numberOfCalories: number;
  numberOfMeals: number;
  numberOfCaloriesMealsChanged = new Subject<{
    numberOfCalories: number;
    numberOfMeals: number;
  }>();
  todaysCalories: number;
  todaysCaloriesChanged = new Subject<number>();

  constructor(private filterService: FilterService) {}

  getMeals() {
    return this.meals.slice();
  }

  setMeals(meals: Meal[]) {
    this.meals = meals;
    this.updateAllComponents();
  }

  addMeal(meal: Meal) {
    this.meals.push(
      new Meal(meal.id, meal.name, meal.calories, new Date(meal.date))
    );
    this.updateAllComponents();
  }

  updateMeal(newMeal: Meal) {
    const index = this.meals.indexOf(newMeal);
    this.meals[index] = newMeal;

    this.updateAllComponents();
  }

  deleteMeal(meal: Meal) {
    const mealPosition = this.meals.indexOf(meal);
    this.meals.splice(mealPosition, 1);
    this.updateAllComponents();
  }

  filterMeals(filter: Filter) {
    const filteredMeals: Meal[] = this.filterService.filterMeals(
      filter,
      this.meals.slice()
    );
    this.mealsChanged.next(filteredMeals);
  }

  mealCaloriesNumberUpdate() {
    this.numberOfCalories = this.meals.reduce((accumulator, meal) => {
      return accumulator + meal.calories;
    }, 0);
    this.numberOfMeals = this.meals.length;
    this.numberOfCaloriesMealsChanged.next({
      numberOfCalories: this.numberOfCalories,
      numberOfMeals: this.numberOfMeals,
    });
  }

  getTodaysCalories() {
    const date = new Date();
    // FIX
    this.todaysCalories = this.meals
      .filter((meal) => {
        const mealDate = new Date(meal.date);
        return (
          mealDate.getDate() === date.getDate() &&
          mealDate.getMonth() === date.getMonth() &&
          mealDate.getFullYear() === date.getFullYear()
        );
      })
      .reduce((acc, meal) => {
        return acc + meal.calories;
      }, 0);
    return this.todaysCalories;
  }

  private updateAllComponents() {
    this.mealCaloriesNumberUpdate();
    this.mealsChanged.next(this.meals.slice());
    this.getTodaysCalories();
    this.todaysCaloriesChanged.next(this.todaysCalories);
  }
}

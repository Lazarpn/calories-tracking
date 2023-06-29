import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meal } from './meal.model';
import { Filter } from './meal-list/filter.model';
import { FilterService } from '../shared/filter.service';

@Injectable({ providedIn: 'root' })
export class MealsService {
  private meals: Meal[] = [];
  mealsChanged = new Subject<Meal[]>();
  todaysCaloriesChanged = new Subject<number>();
  todaysMealsChanged = new Subject<number>();
  totalMealsChanged = new Subject<number>();
  totalCaloriesChanged = new Subject<number>();

  constructor(private filterService: FilterService) {}

  getMeals() {
    return this.meals.slice();
  }

  setMeals(meals: Meal[]) {
    this.meals = meals;
    this.meals.map(meal => (meal.date = new Date(meal.date)));
    this.updateAllComponents();
  }

  createMeal(meal: Meal) {
    meal.date = new Date(meal.date);
    this.meals.push(meal);
    this.updateAllComponents();
  }

  updateMeal(newMeal: Meal) {
    const index = this.meals.indexOf(newMeal);
    this.meals[index] = newMeal;
    // FIXME: mozda treba ovde da se proveri za datum da li je danasnji
    this.updateAllComponents();
  }

  deleteMeal(meal: Meal) {
    // FIXME: mogu da vrsim promenu da li je izbrisani meal danasnjeg datuma i tek onda da odredim koja vrsta update-a treba itd..
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

  getTotalMeals() {
    return this.meals.length;
  }

  getTodaysMeals() {
    return this.meals.filter(meal => {
      const date = new Date();
      const mealDate = new Date(meal.date);
      return (
        mealDate.getDate() === date.getDate() &&
        mealDate.getMonth() === date.getMonth() &&
        mealDate.getFullYear() === date.getFullYear()
      );
    }).length;
  }

  getTotalCalories() {
    return this.meals.reduce((accumulator, meal) => {
      return accumulator + meal.calories;
    }, 0);
  }

  getTodaysCalories() {
    return this.meals
      .filter(meal => {
        const date = new Date();
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
  }

  private updateAllComponents() {
    //FIXME: Ovo moze da se popakuje po funkcijama gde sta treba a ne uvek sve
    this.mealsChanged.next(this.meals.slice());
    this.totalCaloriesChanged.next(this.getTotalCalories());
    this.totalMealsChanged.next(this.getTotalMeals());
    this.todaysMealsChanged.next(this.getTodaysMeals());
    this.todaysCaloriesChanged.next(this.getTodaysCalories());
  }
}

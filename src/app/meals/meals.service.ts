import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MealDateFilter } from '../shared/models/meal/meal-date-filter.model';
import { FilterService } from '../shared/filter.service';
import { Meal } from '../shared/models/meal/meal.model';
import { MealUpdate } from '../shared/models/meal/meal-update.model';

@Injectable({ providedIn: 'root' })
export class MealsService {
  private meals: Meal[] = [];
  mealsChanged = new Subject<Meal[]>();
  todaysCaloriesChanged = new Subject<number>();
  todaysMealsChanged = new Subject<number>();
  totalMealsChanged = new Subject<number>();
  totalCaloriesChanged = new Subject<number>();
  mealChangesSaved: boolean = true;

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

  updateMeal(id: string, model: MealUpdate) {
    const index = this.meals.indexOf(this.meals.find(m => m.id === id));
    this.meals[index].name = model.name;
    this.meals[index].date = model.date;
    this.meals[index].calories = model.calories;
    this.updateAllComponents();
  }

  deleteMeal(meal: Meal) {
    const mealPosition = this.meals.indexOf(meal);
    this.meals.splice(mealPosition, 1);
    this.updateAllComponents();
  }

  filterMeals(filter: MealDateFilter) {
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
    this.mealsChanged.next(this.meals.slice());
    this.totalCaloriesChanged.next(this.getTotalCalories());
    this.totalMealsChanged.next(this.getTotalMeals());
    this.todaysMealsChanged.next(this.getTodaysMeals());
    this.todaysCaloriesChanged.next(this.getTodaysCalories());
  }
}

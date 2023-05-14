import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meal } from './meal.model';
import { MealsDataService } from './meals-data.service';
import { Filter } from './meal-list/filter.model';
import { FilterService } from '../shared/filter.service';

@Injectable({ providedIn: 'root' })
export class MealsService {
  mealsChanged = new Subject<Meal[]>();
  numberOfCaloriesMealsChanged = new Subject<{
    numberOfCalories: number;
    numberOfMeals: number;
  }>();
  todaysCaloriesChanged = new Subject<number>();
  private meals: Meal[] = [];
  numberOfCalories: number;
  numberOfMeals: number;
  todaysCalories: number;

  constructor(
    private mealsDataService: MealsDataService,
    private filterService: FilterService
  ) {}

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

  getMeals() {
    if (this.meals.length === 0) {
      this.mealsDataService.getMeals().subscribe((meals) => {
        if (meals) {
          this.meals = meals;
          this.mealCaloriesNumberUpdate();
          this.getTodaysCalories();
          this.todaysCaloriesChanged.next(this.todaysCalories);
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

  mealAdd() {
    const meal = new Meal(null, '', 0, new Date());

    this.mealsDataService.addMeal(meal).subscribe((meal: Meal) => {
      console.log(meal.date);
      this.meals.push(
        new Meal(meal.id, meal.name, meal.calories, new Date(meal.date))
      );
      this.mealsChanged.next(this.meals.slice());
      this.mealCaloriesNumberUpdate();
      this.getTodaysCalories();
      this.todaysCaloriesChanged.next(this.todaysCalories);
    });
  }

  mealUpdate(index: number, newMeal: Meal) {
    this.meals[index] = newMeal;
    this.mealsChanged.next(this.meals.slice());
    this.mealCaloriesNumberUpdate();

    this.mealsDataService.changeMeal(newMeal).subscribe((meals: Meal[]) => {});
    this.getTodaysCalories();
    this.todaysCaloriesChanged.next(this.todaysCalories);
  }

  mealDelete(meal: Meal) {
    const mealPosition = this.meals.indexOf(meal);
    this.meals.splice(mealPosition, 1);

    this.mealCaloriesNumberUpdate();

    this.mealsChanged.next(this.meals.slice());
    this.mealsDataService.deleteMeal(meal.id).subscribe((meals: Meal[]) => {});
    this.getTodaysCalories();
    this.todaysCaloriesChanged.next(this.todaysCalories);
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
}

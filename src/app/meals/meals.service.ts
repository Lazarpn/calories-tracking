import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meal } from './meal.model';
import { MealsDataService } from './meals-data.service';
import { Filter } from './meal-list/filter.model';

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

  constructor(private mealsDataService: MealsDataService) {}

  filterMeals(event: Filter) {
    console.log(event);
    const filter: Filter = event;
    const formatedDateStart = new Date(filter.dateStart);
    const formatedDateEnd = new Date(filter.dateEnd);
    const formatedTimeStart = filter.timeStart;
    const formatedTimeEnd = filter.timeEnd;

    const filteredMeals = this.meals.filter((meal) => {
      const mealDate = new Date(meal.date);
      // FIX
      const hours = new Date(mealDate).getHours();
      const minutes = new Date(mealDate).getMinutes();
      const mealTime = `${hours}:${minutes}`;

      // BOTH DATES SET
      if (filter.dateStart != '' && filter.dateEnd != '') {
        // BOTH TIMES SET
        if (filter.timeStart != '' && filter.timeEnd != '') {
          const answer =
            mealDate >= formatedDateStart &&
            mealDate <= formatedDateEnd &&
            mealTime >= formatedTimeStart &&
            mealTime <= formatedTimeEnd;
          return answer;
        }

        // ONLY TIME START SET
        if (filter.timeStart != '' && filter.timeEnd === '') {
          const answer =
            mealDate >= formatedDateStart &&
            mealDate <= formatedDateEnd &&
            mealTime >= formatedTimeStart;
          return answer;
        }
        // ONLY TIME END SET
        if (filter.timeEnd != '' && filter.timeStart === '') {
          const answer =
            mealDate >= formatedDateStart &&
            mealDate <= formatedDateEnd &&
            mealTime <= formatedTimeEnd;
          return answer;
        }
        // BOTH TIMES NOT SET
        if (filter.timeEnd === '' && filter.timeStart === '') {
          const answer =
            mealDate >= formatedDateStart && mealDate <= formatedDateEnd;
          return answer;
        }
      }

      // ONLY DATE START SET

      if (filter.dateStart != '' && filter.dateEnd === '') {
        // BOTH TIMES SET
        if (filter.timeStart != '' && filter.timeEnd != '') {
          const answer =
            mealDate >= formatedDateStart &&
            mealTime >= formatedTimeStart &&
            mealTime <= formatedTimeEnd;
          return answer;
        }

        // ONLY TIME START SET
        if (filter.timeStart != '' && filter.timeEnd === '') {
          const answer =
            mealDate >= formatedDateStart && mealTime >= formatedTimeStart;

          return answer;
        }
        // ONLY TIME END SET
        if (filter.timeEnd != '' && filter.timeStart === '') {
          const answer =
            mealDate >= formatedDateStart && mealTime <= formatedTimeEnd;
          return answer;
        }
        // BOTH TIMES NOT SET
        if (filter.timeEnd === '' && filter.timeStart === '') {
          const answer = mealDate >= formatedDateStart;
          return answer;
        }
      }

      // ONLY DATE END SET

      if (filter.dateEnd != '' && filter.dateStart === '') {
        // BOTH TIMES SET
        if (filter.timeStart != '' && filter.timeEnd != '') {
          const answer =
            mealDate <= formatedDateEnd &&
            mealTime >= formatedTimeStart &&
            mealTime <= formatedTimeEnd;
          return answer;
        }

        // ONLY TIME START SET
        if (filter.timeStart != '' && filter.timeEnd === '') {
          const answer =
            mealDate <= formatedDateEnd && mealTime >= formatedTimeStart;

          return answer;
        }
        // ONLY TIME END SET
        if (filter.timeEnd != '' && filter.timeStart === '') {
          const answer =
            mealDate <= formatedDateEnd && mealTime <= formatedTimeEnd;
          return answer;
        }
        // BOTH TIMES NOT SET
        if (filter.timeEnd === '' && filter.timeStart === '') {
          const answer = mealDate <= formatedDateEnd;
          return answer;
        }
      }

      // BOTH DATES NOT SET

      if (filter.dateStart === '' && filter.dateEnd === '') {
        // BOTH TIMES SET
        if (filter.timeStart != '' && filter.timeEnd != '') {
          const answer =
            mealTime >= formatedTimeStart && mealTime <= formatedTimeEnd;
          return answer;
        }

        // ONLY TIME START SET
        if (filter.timeStart != '' && filter.timeEnd === '') {
          const answer = mealTime >= formatedTimeStart;

          return answer;
        }
        // ONLY TIME END SET
        if (filter.timeEnd != '' && filter.timeStart === '') {
          const answer = mealTime <= formatedTimeEnd;
          return answer;
        }
        // BOTH TIMES NOT SET
        if (filter.timeEnd === '' && filter.timeStart === '') {
          return true;
        }
      }

      return true;
    });

    if (filteredMeals) {
      this.numberOfMeals = filteredMeals.length;
      this.numberOfCalories = filteredMeals.reduce((accumulator, meal) => {
        return accumulator + meal.calories;
      }, 0);

      this.numberOfCaloriesMealsChanged.next({
        numberOfCalories: this.numberOfCalories,
        numberOfMeals: this.numberOfMeals,
      });
    }

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
      console.log(meal);
      this.meals.push(meal);
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
      .filter((meal) => meal.date === date)
      .reduce((acc, meal) => {
        return acc + meal.calories;
      }, 0);
    return this.todaysCalories;
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Meal } from './meal.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Filter } from './meal-list/filter.model';

@Injectable({ providedIn: 'root' })
export class MealsService {
  mealsChanged = new Subject<Meal[]>();
  private meals: Meal[] = [];

  constructor(private dataStorageService: DataStorageService) {}

  filterMeals(event: Filter) {
    const filter: Filter = event;
    const formatedDateStart = new Date(filter.dateStart);
    const formatedDateEnd = new Date(filter.dateEnd);
    const formatedTimeStart = filter.timeStart;
    const formatedTimeEnd = filter.timeEnd;

    const filteredMeals = this.meals.filter((meal) => {
      const mealDate = new Date(meal.date);
      const mealTime = meal.time;
      // console.log(meal);

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
            mealDate >= formatedDateStart && mealTime >= formatedTimeStart;
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
            mealDate <= formatedDateEnd && mealTime >= formatedTimeStart;
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
          const answer = mealTime >= formatedTimeStart;
          mealTime <= formatedTimeEnd;
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

    // this.meals = filteredMeals;
    this.mealsChanged.next(filteredMeals);
  }

  getMeals() {
    if (this.meals.length === 0) {
      this.dataStorageService.getMeals().subscribe((meals) => {
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
  }

  mealDelete(id: number) {
    this.meals.splice(id, 1);
    this.mealsChanged.next(this.meals.slice());
    this.dataStorageService.storeMeals(this.meals);
  }

  // mealsUpdate() {}
}

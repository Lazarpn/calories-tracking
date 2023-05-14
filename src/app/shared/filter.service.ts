import { Injectable } from '@angular/core';
import { Filter } from '../meals/meal-list/filter.model';
import { Meal } from '../meals/meal.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  filterMeals(filter: Filter, meals: Meal[]): Meal[] {
    let filteredMeals: Meal[];
    // FINAL DATESTART
    if (filter.dateStart != '') {
      if (filter.timeStart != '') {
        const time = filter.timeStart.split(':');
        filter.dateStart = new Date(filter.dateStart.setHours(+time[0]));
        filter.dateStart = new Date(filter.dateStart.setMinutes(+time[1]));
      } else {
        filter.dateStart = new Date(filter.dateStart.setHours(0));
      }
    }

    if (filter.dateEnd != '') {
      if (filter.timeEnd != '') {
        const time = filter.timeEnd.split(':');
        filter.dateEnd = new Date(filter.dateEnd.setHours(+time[0]));
        filter.dateEnd = new Date(filter.dateEnd.setMinutes(+time[1]));
      } else {
        filter.dateEnd = new Date(filter.dateEnd.setHours(0));
      }
    }

    console.log(filter);

    // FINAL DATEEND

    filteredMeals = meals.filter((meal: Meal) => {
      const mealHours = meal.date.getHours();
      const mealMinutes = meal.date.getMinutes();
      const mealTime = `${mealHours}:${mealMinutes}`;
      if (filter.dateStart && filter.dateEnd) {
        return meal.date >= filter.dateStart && meal.date <= filter.dateEnd;
      }

      if (filter.dateStart && !filter.dateEnd) {
        return meal.date >= filter.dateStart;
      }

      if (filter.dateEnd && !filter.dateStart) {
        return meal.date <= filter.dateEnd;
      }

      return meal;
    });
    return filteredMeals;
  }
}

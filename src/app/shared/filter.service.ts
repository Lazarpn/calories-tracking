import { Injectable } from '@angular/core';
import { MealDateFilter } from './models/meal/meal-date-filter.model';
import { Meal } from './models/meal/meal.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  filterMeals(filter: MealDateFilter, meals: Meal[]): Meal[] {
    // let filteredMeals: Meal[];
    // // FINAL DATESTART
    // if (filter.dateStart != '') {
    //   if (filter.timeStart != '') {
    //     // const time = filter.timeStart.split(':');
    //     // filter.dateStart = new Date(filter.dateStart.setHours(+time[0]));
    //     // filter.dateStart = new Date(filter.dateStart.setMinutes(+time[1]));
    //     filter.dateStart = new Date(filter.dateStart.setHours(0));
    //   } else {
    //     filter.dateStart = new Date(filter.dateStart.setHours(0));
    //   }
    // }

    // if (filter.dateEnd != '') {
    //   if (filter.timeEnd != '') {
    //     // const time = filter.timeEnd.split(':');
    //     // filter.dateEnd = new Date(filter.dateEnd.setHours(+time[0]));
    //     // filter.dateEnd = new Date(filter.dateEnd.setMinutes(+time[1]));
    //     filter.dateEnd = new Date(filter.dateEnd.setHours(0));
    //   } else {
    //     filter.dateEnd = new Date(filter.dateEnd.setHours(0));
    //   }
    // }

    // // FINAL DATEEND

    // filteredMeals = meals.filter((meal: Meal) => {
    //   const mealHours = meal.date.getHours();
    //   const mealMinutes = meal.date.getMinutes();
    //   const mealTime = `${mealHours.toString().padStart(2, '0')}:${mealMinutes
    //     .toString()
    //     .padStart(2, '0')}`;
    //   if (filter.dateStart && filter.dateEnd) {
    //     if (!filter.timeEnd) {
    //       return (
    //         meal.date >= filter.dateStart &&
    //         meal.date <= filter.dateEnd &&
    //         mealTime >= filter.timeStart
    //       );
    //     }

    //     if (filter.timeEnd < filter.timeStart) {
    //       return (
    //         meal.date >= filter.dateStart &&
    //         meal.date <= filter.dateEnd &&
    //         mealTime >= filter.timeStart &&
    //         mealTime >= filter.timeEnd
    //       );
    //     }

    //     return (
    //       meal.date >= filter.dateStart &&
    //       meal.date <= filter.dateEnd &&
    //       mealTime >= filter.timeStart &&
    //       mealTime <= filter.timeEnd
    //     );
    //   }

    //   if (filter.dateStart && !filter.dateEnd) {
    //     if (filter.timeEnd) {
    //       if (filter.timeEnd < filter.timeStart) {
    //         return (
    //           meal.date >= filter.dateEnd &&
    //           mealTime >= filter.timeEnd &&
    //           mealTime >= filter.timeStart
    //         );
    //       }
    //       return (
    //         meal.date >= filter.dateEnd &&
    //         mealTime <= filter.timeEnd &&
    //         mealTime >= filter.timeStart
    //       );
    //     }

    //     return meal.date >= filter.dateStart && mealTime >= filter.timeStart;
    //   }

    //   if (filter.dateEnd && !filter.dateStart) {
    //     if (filter.timeStart) {
    //       if (filter.timeEnd < filter.timeStart) {
    //         return (
    //           meal.date >= filter.dateEnd &&
    //           mealTime >= filter.timeEnd &&
    //           mealTime >= filter.timeStart
    //         );
    //       }
    //       return (
    //         meal.date <= filter.dateEnd &&
    //         mealTime >= filter.timeStart &&
    //         mealTime <= filter.timeEnd
    //       );
    //     }

    //     if (!filter.timeEnd) {
    //       return meal.date <= filter.dateEnd;
    //     }
    //     return meal.date <= filter.dateEnd && mealTime <= filter.timeEnd;
    //   }

    //   if (!filter.dateStart && !filter.dateEnd) {
    //     if (filter.timeStart && filter.timeEnd) {
    //       return mealTime > filter.timeStart && mealTime < filter.timeEnd;
    //     }

    //     if (filter.timeStart) {
    //       return mealTime > filter.timeStart;
    //     }

    //     if (filter.timeEnd) {
    //       return mealTime < filter.timeEnd;
    //     }
    //   }

    //   return meal;
    // });
    // return filteredMeals;
    return meals;
  }
}

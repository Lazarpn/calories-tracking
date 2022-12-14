import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../meals/meal.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient) {}

  storeMeals(meals: Meal[]) {
    this.http
      .put(
        'https://calories-tracker-e16f1-default-rtdb.firebaseio.com/meals.json',
        meals
      )
      .subscribe((meals) => {
        console.log(meals);
      });
  }

  getMeals() {
    return this.http.get<Meal[]>(
      'https://calories-tracker-e16f1-default-rtdb.firebaseio.com/meals.json'
    );
  }
}

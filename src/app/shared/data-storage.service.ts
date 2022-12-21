import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../meals/meal.model';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, take } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  storeMeals(meals: Meal[]) {
    this.http
      .put(
        'https://calories-tracker-e16f1-default-rtdb.firebaseio.com/meals.json',
        meals
      )
      .subscribe((meals) => {});
  }

  getMeals() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Meal[]>(
          'https://calories-tracker-e16f1-default-rtdb.firebaseio.com/meals.json'
        );
      })
    );
  }
}

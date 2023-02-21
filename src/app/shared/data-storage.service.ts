import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from '../meals/meal.model';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, take } from 'rxjs';
import { User } from '../auth/user.model';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  storeMeals(meals: Meal[]) {
    this.authService.user.subscribe((user) => {
      if (user)
        this.http
          .put(
            `https://calories-tracker-e16f1-default-rtdb.firebaseio.com/${user.id}/meals.json`,
            meals
          )
          .subscribe((meals) => {});
    });
  }

  getMeals() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<Meal[]>(
          `https://calories-tracker-e16f1-default-rtdb.firebaseio.com/${user.id}/meals.json`
        );
      })
    );
  }

  storeUserInfo(info) {
    this.authService.user.subscribe((user) => {
      if (user)
        this.http
          .put(
            `https://calories-tracker-e16f1-default-rtdb.firebaseio.com/${user.id}/user-info.json`,
            info
          )
          .subscribe((info) => {
            console.log(info);
          });
    });
  }

  getUserInfo() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<{}>(
          `https://calories-tracker-e16f1-default-rtdb.firebaseio.com/${user.id}/user-info.json`
        );
      })
    );
  }

  storeUserSettings(settings) {
    this.authService.user.subscribe((user) => {
      if (user)
        this.http
          .put(
            `https://calories-tracker-e16f1-default-rtdb.firebaseio.com/${user.id}/user-settings.json`,
            settings
          )
          .subscribe((settings) => {
            console.log(settings);
          });
    });
  }

  getUserSettings() {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        return this.http.get<{}>(
          `https://calories-tracker-e16f1-default-rtdb.firebaseio.com/${user.id}/user-settings.json`
        );
      })
    );
  }
}

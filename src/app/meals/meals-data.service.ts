import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from './meal.model';
import { AuthService } from '../auth/auth.service';
import { exhaustMap, last, take, takeLast } from 'rxjs';
import { User } from '../auth/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class MealsDataService {
  url: string = environment.url;
  constructor(private http: HttpClient, private authService: AuthService) {}

  changeMeal(meal: Meal) {
    return this.http.put<Meal[]>(this.url + `/Meals/meal/${meal.id}`, {
      name: meal.name,
      id: meal.id,
      calories: meal.calories,
      date: meal.date,
      time: meal.time,
    });
  }

  addMeal(meal: Meal) {
    const userId = this.authService.userId;
    return this.http.post<Meal>(this.url + `/Meals`, {
      name: 'Obrok',
      calories: meal.calories,
      mealsUserId: userId,
      date: meal.date,
      time: meal.time,
    });
  }

  deleteMeal(id: number) {
    return this.http.delete<Meal[]>(this.url + `/Meals/${id}`);
  }
  getMeals() {
    const userId = this.authService.userId;
    return this.http.get<Meal[]>(this.url + `/Meals/meals/${userId}`);
  }
}

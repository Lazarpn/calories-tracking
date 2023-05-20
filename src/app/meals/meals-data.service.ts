import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Meal } from './meal.model';
import { AuthService } from '../auth/auth.service';
import { environment } from 'src/environments/environment';
import { MealsService } from './meals.service';

@Injectable({ providedIn: 'root' })
export class MealsDataService {
  url: string = environment.url;
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private mealsService: MealsService
  ) {}

  updateMeal(meal: Meal) {
    this.http
      .put<Meal[]>(this.url + `/Meals/${meal.id}`, {
        name: meal.name,
        id: meal.id,
        calories: meal.calories,
        date: meal.date,
      })
      .subscribe((meals: Meal[]) => {
        this.mealsService.updateMeal(meal);
      });
  }

  addMeal() {
    const meal = new Meal(null, '', 0, new Date());
    const userId = this.authService.userId;
    this.http
      .post<Meal>(this.url + `/Meals`, {
        name: 'Obrok',
        calories: meal.calories,
        mealsUserId: userId,
        date: meal.date,
      })
      .subscribe((meal: Meal) => {
        this.mealsService.addMeal(meal);
      });
  }

  deleteMeal(meal: Meal) {
    this.http
      .delete<HttpResponse<200 | 404>>(this.url + `/Meals/${meal.id}`)
      .subscribe(
        (res: HttpResponse<200>) => {
          this.mealsService.deleteMeal(meal);
        },
        (err: HttpErrorResponse) => {
          alert("We couldn't delete that meal, try again!");
        }
      );
  }
  getMeals() {
    const userId = this.authService.userId;
    this.http
      .get<Meal[]>(this.url + `/Meals/user/${userId}`)
      .subscribe((meals: Meal[]) => {
        this.mealsService.setMeals(meals);
      });
  }
}

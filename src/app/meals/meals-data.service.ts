import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meal } from './meal.model';
import { MealsService } from './meals.service';

@Injectable({ providedIn: 'root' })
export class MealsDataService {
  url: string = environment.url + '/api';
  constructor(private http: HttpClient, private mealsService: MealsService) {}

  updateMeal(meal: Meal) {
    this.http
      .put<HttpResponse<204>>(this.url + `/meals/${meal.id}`, {
        name: meal.name,
        calories: meal.calories,
        date: meal.date,
      })
      .subscribe(res => this.mealsService.updateMeal(meal));
  }

  createMeal() {
    this.http
      .post<Meal>(this.url + `/meals`, {
        name: 'Meal',
        calories: 0,
        date: new Date(),
      })
      .subscribe((meal: Meal) => {
        this.mealsService.createMeal(meal);
      });
  }

  deleteMeal(meal: Meal) {
    this.http
      .delete<HttpResponse<204>>(this.url + `/meals/${meal.id}`)
      .subscribe(res => this.mealsService.deleteMeal(meal));
  }

  getMeals() {
    this.http
      .get<Meal[]>(this.url + `/meals/me`)
      .subscribe(meals => this.mealsService.setMeals(meals));
  }
}

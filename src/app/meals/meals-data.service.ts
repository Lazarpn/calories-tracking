import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meal } from '../shared/models/meal/meal.model';
import { MealsService } from './meals.service';
import { MealUpdate } from '../shared/models/meal/meal-update.model';

@Injectable({ providedIn: 'root' })
export class MealsDataService {
  url: string = environment.url + '/api';
  constructor(private http: HttpClient, private mealsService: MealsService) {}

  updateMeal(id: string, model: MealUpdate) {
    this.http
      .put<void>(this.url + `/meals/${id}`, {
        name: model.name,
        calories: model.calories,
        date: model.date,
      })
      .subscribe(() => this.mealsService.updateMeal(id, model));
  }

  createMeal() {
    this.http
      .post<Meal>(this.url + `/meals`, {
        name: 'Meal',
        calories: 0,
        date: new Date(),
      })
      .subscribe(meal => this.mealsService.createMeal(meal));
  }

  deleteMeal(meal: Meal) {
    this.http
      .delete<void>(this.url + `/meals/${meal.id}`)
      .subscribe(() => this.mealsService.deleteMeal(meal));
  }

  getMeals() {
    this.http
      .get<Meal[]>(this.url + `/meals/me`)
      .subscribe(meals => this.mealsService.setMeals(meals));
  }
}

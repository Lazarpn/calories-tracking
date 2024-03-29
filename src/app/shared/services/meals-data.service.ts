import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Meal } from '../models/meal/meal.model';
import { MealsService } from './meals.service';
import { MealUpdateModel } from '../models/meal/meal-update-model';
import { MealCreateModel } from '../models/meal/meal-create-model';

@Injectable({ providedIn: 'root' })
export class MealsDataService {
  url: string = `${environment.url}/api`;
  constructor(
    private http: HttpClient,
    private mealsService: MealsService
  ) {}

  updateMeal(id: string, model: MealUpdateModel) {
    this.http.put<void>(`${this.url}/meals/${id}`, model).subscribe({
      next: _ => this.mealsService.updateMeal(id, model),
      error: exceptions => this.mealsService.setMealsErrors(exceptions),
    });
  }

  createMeal() {
    const meal = new MealCreateModel();
    this.http.post<Meal>(`${this.url}/meals`, meal).subscribe({
      next: meal => this.mealsService.createMeal(meal),
      error: exceptions => this.mealsService.setMealsErrors(exceptions),
    });
  }

  deleteMeal(meal: Meal) {
    this.http.delete<void>(`${this.url}/meals/${meal.id}`).subscribe({
      next: _ => this.mealsService.deleteMeal(meal),
      error: exceptions => this.mealsService.setMealsErrors(exceptions),
    });
  }

  getMeals() {
    this.http.get<Meal[]>(`${this.url}/meals/me`).subscribe({
      next: meals => this.mealsService.setMeals(meals),
      error: exceptions => this.mealsService.setMealsErrors(exceptions),
    });
  }
}

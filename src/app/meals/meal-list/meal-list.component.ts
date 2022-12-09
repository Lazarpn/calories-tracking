import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal.model';

@Component({
  selector: 'app-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent implements OnInit {
  meals: Meal[] = [];
  constructor() {}

  ngOnInit(): void {}

  onMealAdd() {
    this.meals.push({
      mealName: '',
      calories: 0,
      date: new Date(),
    });
  }

  onMealDelete(event: Meal) {
    const meal = event;
    const id = this.meals.indexOf(meal);
    this.meals.splice(id, 1);
  }
}

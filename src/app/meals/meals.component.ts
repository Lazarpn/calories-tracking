import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Filter } from './meal-list/filter.model';
import { Meal } from '../shared/models/meal/meal.model';
import { MealsDataService } from './meals-data.service';
import { MealsService } from './meals.service';

@Component({
  selector: 'ct-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.scss'],
})
export class MealsComponent implements OnInit {
  filterApplied: boolean = false;
  meals: Meal[] = [];

  constructor(
    private mealsService: MealsService,
    private mealsDataService: MealsDataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.meals = this.mealsService.getMeals();
    this.mealsService.mealsChanged.subscribe(meals => (this.meals = meals));

    if (this.meals.length === 0) {
      this.mealsDataService.getMeals();
    }
  }

  onMealAdd() {
    this.mealsDataService.createMeal();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onFilterApplied(filter: Filter) {
    const isFilterEmpty = Object.values(filter).every(value => value === '');
    this.filterApplied = !isFilterEmpty;
    this.mealsService.filterMeals(filter);
  }

  ngOnDestroy(): void {}
}

import { Component, Input, OnInit } from '@angular/core';
import { MealsService } from './meals.service';
import { Meal } from './meal.model';
import { MealsDataService } from './meals-data.service';
import { ActivatedRoute } from '@angular/router';

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
    this.mealsService.mealsChanged.subscribe((meals: Meal[]) => {
      this.meals = meals;
    });

    if (this.meals.length === 0) {
      this.mealsDataService.getMeals();
    }
  }

  onMealAdd() {
    this.mealsDataService.addMeal();
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onFilterApplied(event) {
    const isFilterEmpty = Object.values(event).every(value => value === '');
    this.filterApplied = !isFilterEmpty;
    this.mealsService.filterMeals(event);
  }

  ngOnDestroy(): void {}
}

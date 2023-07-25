import { Component, Input, OnInit } from '@angular/core';
import { Meal } from '../../shared/models/meal/meal.model';

@Component({
  selector: 'ct-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent implements OnInit {
  @Input() meals: Meal[] = [];

  constructor() {}

  ngOnInit(): void {}
}

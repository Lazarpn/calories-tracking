import { Component, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from '../../../shared/models/meal/meal.model';
import { MealsDataService } from '../../../shared/services/meals-data.service';
import { MealsService } from '../../../shared/services/meals.service';

@Component({
  selector: 'ct-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
  @ViewChild('form', { static: true }) mealForm: NgForm;
  @HostBinding('class.meal-edit') isEditMode = false;
  // If you had cancel option, you would use separate model
  @Input() meal: Meal;
  isDisabled: boolean = true;
  changesSaved: boolean = true;

  get mealTime(): string {
    return `${this.meal.date.getHours()}:${this.meal.date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;
  }

  set mealTime(value: string) {
    if (!value) {
      return;
    }
    const [hours, minutes] = value.split(':');
    this.meal.date.setHours(+hours);
    this.meal.date.setMinutes(+minutes);
  }

  get mealDate(): string {
    return `${this.meal.date.getFullYear()}-${(this.meal.date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.meal.date.getDate().toString().padStart(2, '0')}`;
  }

  set mealDate(value: string) {
    // FIXME:ne radi kako treba
    console.log(value);

    if (!value) {
      console.log(value);
      // this.meal.date = this.meal.date;
      this.meal.date = new Date();
      return;
    }
    console.log(value);

    const hours = this.meal.date.getHours();
    const minutes = this.meal.date.getMinutes();
    this.meal.date = new Date(value);
    this.meal.date.setHours(hours);
    this.meal.date.setMinutes(minutes);
  }

  constructor(
    private mealsDataService: MealsDataService,
    private mealsService: MealsService
  ) {}

  ngOnInit(): void {}

  onInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }

  onMealConfirm() {
    console.log(this.meal.date);
    this.isEditMode = false;
    this.isDisabled = true;
    this.changesSaved = true;
    this.mealsDataService.updateMeal(this.meal.id, this.meal);
    this.mealsService.mealChangesSaved = true;
  }

  onMealEdit() {
    this.isDisabled = false;
    this.isEditMode = true;
    this.changesSaved = false;
    this.mealsService.mealChangesSaved = false;
  }

  onMealDelete() {
    this.mealsDataService.deleteMeal(this.meal);
  }
}

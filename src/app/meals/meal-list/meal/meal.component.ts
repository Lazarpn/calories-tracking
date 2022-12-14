import {
  AfterViewChecked,
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from '../../meal.model';
import { EventEmitter } from '@angular/core';
import { MealsService } from '../../meals.service';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, AfterViewChecked {
  @ViewChild('form', { static: true }) mealForm: NgForm;

  @Input() meal: Meal;
  isDisabled: boolean = false;
  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    // HAS TO BE FIXED - TOO MANY UNWANTED NUMBER OF SETTINGS
    // this.mealForm.form.patchValue({ date: this.meal.date });
    // console.log(this.mealForm.value.date);
  }

  onFormSubmit() {}

  onMealConfirm() {
    const value = this.mealForm.value;
    const mealId = this.mealsService.getMeal(this.meal);
    console.log(this.meal, mealId);
    this.isDisabled = true;
    this.meal.mealName = value.mealName;
    this.meal.calories = value.calories;
    this.meal.date = value.date;
    this.meal.time = value.time;
    this.mealsService.mealUpdate(mealId, this.meal);
  }

  onMealEdit() {
    this.isDisabled = false;
  }

  onMealDelete() {
    const id = this.mealsService.getMeal(this.meal);
    this.mealsService.mealDelete(id);
  }
}

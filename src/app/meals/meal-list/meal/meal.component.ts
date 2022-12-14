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
import { Subject } from 'rxjs';

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, AfterViewChecked {
  @ViewChild('form', { static: true }) mealForm: NgForm;

  @Input() meal: Meal;
  isDisabled: boolean = true;
  changesSaved: boolean = true;

  @Output() changesSavedInfo = new Subject<boolean>();
  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    // HAS TO BE FIXED - TOO MANY UNWANTED NUMBER OF SETTINGS
    // this.mealForm.form.patchValue({ date: this.meal.date });
    // console.log(this.mealForm.value.date);
  }

  onFormSubmit() {}

  onMealConfirm() {
    this.changesSaved = true;
    this.changesSavedInfo.next(this.changesSaved);
    const value = this.mealForm.value;
    const mealId = this.mealsService.getMeal(this.meal);
    this.isDisabled = true;
    this.meal.mealName = value.mealName;
    this.meal.calories = value.calories;
    this.meal.date = value.date;
    this.meal.time = value.time;
    console.log(value);
    this.mealsService.mealUpdate(mealId, this.meal);
  }

  onMealEdit() {
    this.isDisabled = false;
    this.changesSaved = false;
    this.changesSavedInfo.next(this.changesSaved);
  }

  onMealDelete() {
    const id = this.mealsService.getMeal(this.meal);
    this.mealsService.mealDelete(id);
  }
}

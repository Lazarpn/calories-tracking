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

@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit, AfterViewChecked {
  @ViewChild('form', { static: true }) mealForm: NgForm;
  @Output() mealDeleted = new EventEmitter<Meal>();
  @Input() meal: Meal;
  isConfirmed: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    // HAS TO BE FIXED - TOO MANY UNWANTED NUMBER OF SETTINGS
    this.mealForm.form.patchValue({ date: this.meal.date });
    // console.log(this.mealForm.value.date);
  }

  onFormSubmit() {}

  onConfirm() {
    const value = this.mealForm.value;
    this.isConfirmed = true;
    this.meal.mealName = value.mealName;
    this.meal.calories = value.calories;
    this.meal.date = value.date;
  }

  onEdit() {
    this.isConfirmed = false;
  }

  mealDelete() {
    this.mealDeleted.emit(this.meal);
  }
}

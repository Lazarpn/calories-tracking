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
export class MealComponent implements OnInit {
  @ViewChild('form', { static: true }) mealForm: NgForm;

  @Input() meal: Meal;
  isDisabled: boolean = true;
  changesSaved: boolean = true;

  @Output() changesSavedInfo = new Subject<boolean>();
  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {}

  onFormSubmit() {}

  onInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }

  onMealConfirm() {
    this.changesSaved = true;
    this.changesSavedInfo.next(this.changesSaved);
    const value = this.mealForm.value;
    const mealId = this.mealsService.getMeal(this.meal);
    this.isDisabled = true;
    this.meal.name = value.mealName;
    this.meal.calories = value.calories;
    this.meal.date = value.date;
    this.meal.time = value.time;

    // const dateFormated = new Intl.DateTimeFormat(navigator.language, {
    //   day: '2-digit',
    //   month: 'short',
    //   year: undefined,
    // }).format(new Date(value.date));

    // this.mealForm.controls['date'].setValue(dateFormated);

    console.log(value.date);
    if (!value.calories) {
      value.calories = this.meal.calories = 0;
    }

    this.mealsService.mealUpdate(mealId, this.meal);
  }

  onMealEdit() {
    this.isDisabled = false;
    this.changesSaved = false;
    this.changesSavedInfo.next(this.changesSaved);
  }

  onMealDelete() {
    this.mealsService.mealDelete(this.meal);
  }
}

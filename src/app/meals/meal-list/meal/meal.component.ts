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
  selector: 'ct-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
  @ViewChild('form', { static: true }) mealForm: NgForm;

  @Input() meal: Meal;
  date: string;
  time: string;
  isDisabled: boolean = true;
  changesSaved: boolean = true;

  @Output() changesSavedInfo = new Subject<boolean>();
  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    if (typeof this.meal.date === 'string') {
      this.meal.date = new Date(this.meal.date + 'Z');
      this.date = this.meal.date.toISOString().split('T')[0];
      const hours = this.meal.date.getHours();
      const minutes = this.meal.date.getMinutes();
      this.time = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
    } else {
      this.meal.date = new Date(this.meal.date);
      this.date = this.meal.date.toISOString().split('T')[0];
      const hours = this.meal.date.getHours();
      const minutes = this.meal.date.getMinutes();
      this.time = `${hours.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`;
    }
  }

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
    const time = value.time.split(':');
    this.meal.date = new Date(new Date(value.date).setHours(time[0], time[1]));

    // const dateFormated = new Intl.DateTimeFormat(navigator.language, {
    //   day: '2-digit',
    //   month: 'short',
    //   year: undefined,
    // }).format(new Date(value.date));

    // this.mealForm.controls['date'].setValue(dateFormated);

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

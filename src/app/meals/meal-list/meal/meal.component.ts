import {
  Component,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Meal } from '../../meal.model';
import { MealsDataService } from '../../meals-data.service';

@Component({
  selector: 'ct-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.scss'],
})
export class MealComponent implements OnInit {
  @ViewChild('form', { static: true }) mealForm: NgForm;
  @HostBinding('class.meal-edit') isEditMode = false;
  @Input() meal: Meal;
  isDisabled: boolean = true;

  get mealTime(): string {
    return `${this.meal.date.getHours()}:${this.meal.date.getMinutes()}`;
  }

  set mealTime(value: string) {
    const [hours, minutes] = value.split(':');
    this.meal.date.setHours(+hours);
    this.meal.date.setMinutes(+minutes);
  }

  get mealDate(): string {
    return `${this.meal.date.getFullYear()}-${(this.meal.date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${this.meal.date
      .getDate()
      .toString()
      .padStart(2, '0')}`;
  }

  set mealDate(value: string) {
    const hours = this.meal.date.getHours();
    const minutes = this.meal.date.getMinutes();
    this.meal.date = new Date(value);
    this.meal.date.setHours(hours);
    this.meal.date.setMinutes(minutes);
  }

  constructor(private mealsDataService: MealsDataService) {}

  ngOnInit(): void {}

  onInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }

  onMealConfirm() {
    this.isEditMode = false;
    this.isDisabled = true;
    this.mealsDataService.updateMeal(this.meal);
  }

  onMealEdit() {
    this.isDisabled = false;
    this.isEditMode = true;
  }

  onMealDelete() {
    this.mealsDataService.deleteMeal(this.meal);
  }
}

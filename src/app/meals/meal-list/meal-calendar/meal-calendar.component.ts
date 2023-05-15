import { Component, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Filter } from '../filter.model';
import { MealsService } from '../../meals.service';

@Component({
  selector: 'ct-meal-calendar',
  templateUrl: './meal-calendar.component.html',
  styleUrls: ['./meal-calendar.component.scss'],
})
export class MealCalendarComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: true }) calendarForm: NgForm;
  @Output() filterApplied = new Subject<Filter>();
  constructor(private mealsService: MealsService) {}
  numberOfCalories: number;
  numberOfMeals: number;
  subscription: Subscription;

  ngOnInit(): void {
    this.mealsService.numberOfCaloriesMealsChanged.subscribe((changes) => {
      this.numberOfCalories = changes.numberOfCalories;
      this.numberOfMeals = changes.numberOfMeals;
    });

    this.numberOfCalories = this.mealsService.numberOfCalories;
    this.numberOfMeals = this.mealsService.numberOfMeals;
  }

  onSubmit(form) {
    const dateStart = form.value.dateStart
      ? new Date(form.value.dateStart)
      : '';
    const dateEnd = form.value.dateEnd ? new Date(form.value.dateEnd) : '';

    if (dateEnd < dateStart) {
      if (dateEnd != '') {
        alert('Date end must be bigger than Date end!');
        return;
      }
    }

    const filter: Filter = new Filter(
      dateStart,
      dateEnd,
      form.value.timeStart,
      form.value.timeEnd
    );

    this.filterApplied.next(filter);
  }

  ngOnDestroy(): void {}
}

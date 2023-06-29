import { Component, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Filter } from '../meal-list/filter.model';
import { MealsService } from '../meals.service';
import { MealCalendar } from 'src/app/shared/models/meal-calendar.model';

@Component({
  selector: 'ct-meal-calendar',
  templateUrl: './meal-calendar.component.html',
  styleUrls: ['./meal-calendar.component.scss'],
})
export class MealCalendarComponent implements OnInit, OnDestroy {
  // @ViewChild('calendarForm', { static: true }) calendarForm: NgForm;
  @Output() filterApplied = new Subject<Filter>();

  model: MealCalendar = {
    dateStart: null,
    dateEnd: null,
    timeStart: null,
    timeEnd: null,
  };

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    const dateStart = this.model.dateStart
      ? new Date(this.model.dateStart)
      : '';
    const dateEnd = this.model.dateEnd ? new Date(this.model.dateEnd) : '';

    if (dateEnd < dateStart) {
      if (dateEnd != '') {
        alert('Date end must be bigger than Date end!');
        return;
      }
    }

    const filter: Filter = new Filter(
      dateStart,
      dateEnd,
      this.model.timeStart,
      this.model.timeEnd
    );

    this.filterApplied.next(filter);
  }

  ngOnDestroy(): void {}
}

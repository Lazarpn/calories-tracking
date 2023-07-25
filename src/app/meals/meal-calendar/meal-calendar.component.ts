import { Component, OnInit, Output, ViewChild, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MealDateFilter } from '../../shared/models/meal/meal-date-filter.model';

@Component({
  selector: 'ct-meal-calendar',
  templateUrl: './meal-calendar.component.html',
  styleUrls: ['./meal-calendar.component.scss'],
})
export class MealCalendarComponent implements OnInit, OnDestroy {
  // @ViewChild('calendarForm', { static: true }) calendarForm: NgForm;
  @Output() filterApplied = new Subject<MealDateFilter>();

  model: MealDateFilter = {
    dateStart: new Date(new Date().setHours(0, 0, 0, 0)),
    dateEnd: new Date(new Date().setHours(23, 59, 59)),
  };

  set dateStart(value: string) {
    const hours = this.model.dateStart.getHours();
    const minutes = this.model.dateStart.getMinutes();
    this.model.dateStart = new Date(value);
    this.model.dateStart.setHours(hours);
    this.model.dateStart.setMinutes(minutes);
  }

  set dateEnd(value: string) {
    const hours = this.model.dateEnd.getHours();
    const minutes = this.model.dateEnd.getMinutes();
    this.model.dateEnd = new Date(value);
    this.model.dateEnd.setHours(hours);
    this.model.dateEnd.setMinutes(minutes);
  }

  set timeStart(value: string) {
    const [hours, minutes] = value.split(':');
    this.model.dateStart.setHours(+hours);
    this.model.dateStart.setMinutes(+minutes);
  }

  set timeEnd(value: string) {
    const [hours, minutes] = value.split(':');
    this.model.dateEnd.setHours(+hours);
    this.model.dateEnd.setMinutes(+minutes);
  }

  constructor() {}

  ngOnInit(): void {}

  onSubmit() {
    if (this.model.dateStart > this.model.dateEnd) {
      return alert('Date end must be bigger than Date end!');
    }
    this.filterApplied.next(this.model);
  }

  ngOnDestroy(): void {}
}

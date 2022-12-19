import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { Filter } from '../filter.model';

@Component({
  selector: 'app-meal-calendar',
  templateUrl: './meal-calendar.component.html',
  styleUrls: ['./meal-calendar.component.scss'],
})
export class MealCalendarComponent implements OnInit {
  @ViewChild('form', { static: true }) calendarForm: NgForm;
  @Output() filterApplied = new Subject<Filter>();
  constructor() {}

  ngOnInit(): void {}

  onSubmit(form) {
    // Converting data
    const unformatedData = form.value;
    let dateStart;
    let dateEnd;
    let dateStartFormated;
    let dateEndFormated;
    let timeStart;
    let timeEnd;
    if (unformatedData.dateStart != '') {
      dateStart = new Date(unformatedData.dateStart);
      dateStartFormated = new Intl.DateTimeFormat(navigator.language, {
        day: '2-digit',
        month: 'short',
        year: undefined,
      }).format(dateStart);
    } else {
      dateStartFormated = '';
    }

    if (unformatedData.dateEnd != '') {
      dateEnd = new Date(unformatedData.dateEnd);
      dateEndFormated = new Intl.DateTimeFormat(navigator.language, {
        day: '2-digit',
        month: 'short',
        year: undefined,
      }).format(dateEnd);
    } else {
      dateEndFormated = '';
    }

    if (unformatedData.timeStart != '') {
      timeStart = unformatedData.timeStart;
    } else {
      timeStart = '';
    }

    if (unformatedData.timeEnd != '') {
      timeEnd = unformatedData.timeEnd;
    } else {
      timeEnd = '';
    }

    const formatedData: Filter = {
      dateStart: dateStartFormated,
      dateEnd: dateEndFormated,
      timeStart: timeStart,
      timeEnd: timeEnd,
    };

    // Converting data
    console.log(formatedData);
    this.filterApplied.next(formatedData);
  }
}

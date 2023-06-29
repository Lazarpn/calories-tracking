import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Meal } from '../meal.model';
import { CanComponentDeactivate } from './meal/can-deactivate-guard.service';

@Component({
  selector: 'ct-meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['./meal-list.component.scss'],
})
export class MealListComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  @Input() meals: Meal[] = [];
  changesSaved: boolean = true;
  //FIXME:mozda ovo ne radi kako treba
  constructor() {}

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.changesSaved) {
      return confirm('Are you sure you want to leave?');
    } else {
      return true;
    }
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}

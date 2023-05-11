import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsComponent } from './meals.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealComponent } from './meal-list/meal/meal.component';
import { MealCalendarComponent } from './meal-list/meal-calendar/meal-calendar.component';
import { MealExpectedCaloriesComponent } from './meal-list/meal-expected-calories/meal-expected-calories.component';
import { FormsModule } from '@angular/forms';
import { MealsRoutingModule } from './meals-routing.module';

@NgModule({
  declarations: [
    MealsComponent,
    MealListComponent,
    MealComponent,
    MealCalendarComponent,
    MealExpectedCaloriesComponent,
  ],
  imports: [CommonModule, FormsModule, MealsRoutingModule],
})
export class MealsModule {}

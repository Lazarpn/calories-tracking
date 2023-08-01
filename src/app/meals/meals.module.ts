import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealsComponent } from './meals.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { MealComponent } from './meal-list/meal/meal.component';
import { MealCalendarComponent } from './meal-calendar/meal-calendar.component';
import { MealExpectedCaloriesComponent } from './meal-expected-calories/meal-expected-calories.component';
import { FormsModule } from '@angular/forms';
import { MealsRoutingModule } from './meals-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { HttpLoaderFactory } from '../shared/loaders/http-loader-factory';

@NgModule({
  declarations: [
    MealsComponent,
    MealListComponent,
    MealComponent,
    MealCalendarComponent,
    MealExpectedCaloriesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MealsRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class MealsModule {}

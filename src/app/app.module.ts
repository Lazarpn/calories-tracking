import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { MealsComponent } from './meals/meals.component';
import { MealListComponent } from './meals/meal-list/meal-list.component';
import { MealComponent } from './meals/meal-list/meal/meal.component';
import { HttpClientModule } from '@angular/common/http';
import { MealCalendarComponent } from './meals/meal-list/meal-calendar/meal-calendar.component';
import { CanDeactivateGuard } from './meals/meal-list/meal/can-deactivate-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    MealsComponent,
    MealListComponent,
    MealComponent,
    MealCalendarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [CanDeactivateGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { MealsComponent } from './meals/meals.component';
import { MealListComponent } from './meals/meal-list/meal-list.component';
import { MealComponent } from './meals/meal-list/meal/meal.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MealCalendarComponent } from './meals/meal-list/meal-calendar/meal-calendar.component';
import { CanDeactivateGuard } from './meals/meal-list/meal/can-deactivate-guard.service';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    MealsComponent,
    MealListComponent,
    MealComponent,
    MealCalendarComponent,
    LoadingSpinnerComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CanDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

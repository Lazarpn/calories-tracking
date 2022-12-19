import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MealsComponent } from './meals/meals.component';
import { CanDeactivateGuard } from './meals/meal-list/meal/can-deactivate-guard.service';
import { MealListComponent } from './meals/meal-list/meal-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'meals',
    component: MealsComponent,
    children: [
      {
        path: 'meal-list',
        component: MealListComponent,
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

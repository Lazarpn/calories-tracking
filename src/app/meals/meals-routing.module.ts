import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { MealListComponent } from './meal-list/meal-list.component';
import { CanDeactivateGuard } from './meal-list/meal/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'meals',
    component: MealsComponent,
    // canActivate: [AuthGuard],
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
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}

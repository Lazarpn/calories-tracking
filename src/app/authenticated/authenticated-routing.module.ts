import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'profile',
    loadChildren: () =>
      import('../profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'meals',
    loadChildren: () =>
      import('../meals/meals.module').then(m => m.MealsModule),
  },
  {
    path: 'manager',
    loadChildren: () =>
      import('../manager/manager.module').then(m => m.ManagerModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedRoutingModule {}

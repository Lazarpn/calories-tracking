import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { UnauthenticatedGuard } from '../shared/guards/unauthenticated.guard';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-meals.guard';

const routes: Routes = [
  {
    path: '',
    component: MealsComponent,
    canActivate: [UnauthenticatedGuard],
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}

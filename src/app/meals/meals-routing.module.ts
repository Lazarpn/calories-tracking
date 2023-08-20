import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { CanDeactivateGuard } from '../shared/guards/can-deactivate-meals.guard';

const routes: Routes = [
  {
    path: '',
    component: MealsComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}

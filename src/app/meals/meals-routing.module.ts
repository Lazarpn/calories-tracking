import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealsComponent } from './meals.component';
import { UnauthenticatedGuard } from '../+auth/unauthenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: MealsComponent,
    canActivate: [UnauthenticatedGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MealsRoutingModule {}

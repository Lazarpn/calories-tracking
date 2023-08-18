import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailConfirmedGuard } from '../shared/guards/email-confirmed.guard';
import { EmailNotConfirmedGuard } from '../shared/guards/email-not-confirmed.guard';
import { VerifyEmailModalComponent } from './verify-email-modal/verify-email-modal.component';

const routes: Routes = [
  {
    path: 'profile',
    canActivate: [EmailConfirmedGuard],
    loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'meals',
    canActivate: [EmailConfirmedGuard],
    loadChildren: () => import('../meals/meals.module').then(m => m.MealsModule),
  },
  {
    path: 'manager',
    canActivate: [EmailConfirmedGuard],
    loadChildren: () => import('../manager/manager.module').then(m => m.ManagerModule),
  },
  {
    path: 'verify-email',
    canActivate: [EmailNotConfirmedGuard],
    component: VerifyEmailModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedRoutingModule {}

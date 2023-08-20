import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyEmailModalComponent } from './verify-email-modal/verify-email-modal.component';
import { EmailNotConfirmedResolver } from '../shared/guards/email-not-confirmed.resolver';
import { EmailConfirmedResolver } from '../shared/guards/email-confirmed.resolver';

const routes: Routes = [
  {
    path: 'profile',
    resolve: { hasEmailConfirmed: EmailConfirmedResolver },
    loadChildren: () => import('../profile/profile.module').then(m => m.ProfileModule),
  },
  {
    path: 'meals',
    resolve: { hasEmailConfirmed: EmailConfirmedResolver },
    loadChildren: () => import('../meals/meals.module').then(m => m.MealsModule),
  },
  {
    path: 'manager',
    resolve: { hasEmailConfirmed: EmailConfirmedResolver },
    loadChildren: () => import('../manager/manager.module').then(m => m.ManagerModule),
  },
  {
    path: 'verify-email',
    resolve: { hasEmailConfirmed: EmailNotConfirmedResolver },
    component: VerifyEmailModalComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticatedRoutingModule {}

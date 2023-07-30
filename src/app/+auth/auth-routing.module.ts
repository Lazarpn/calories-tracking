import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { Role } from '../shared/role';
import { AuthenticatedGuard } from './authenticated.guard';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';
import { AnonymousGuard } from './anonymous.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordModalComponent,
    canActivate: [AnonymousGuard],
  },
  {
    path: 'reset-password/:userId/:token',
    component: ResetPasswordModalComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}

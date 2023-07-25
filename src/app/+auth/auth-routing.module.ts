import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { Role } from '../shared/role';
import { AuthenticatedGuard } from './authenticated.guard';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    canActivate: [AuthenticatedGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
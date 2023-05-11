import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { Role } from '../shared/role';

const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  {
    path: 'manager-auth',
    component: AuthComponent,
    data: {
      role: Role.MANAGER,
    },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class AuthRoutingModule {}

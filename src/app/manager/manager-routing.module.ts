import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { UserInfoListComponent } from './user-info-list/user-info-list.component';
import { UsersGuard } from './users.guard';

const routes: Routes = [
  {
    path: '',
    component: ManagerComponent,
    canActivate: [UsersGuard],
    children: [
      { path: '', redirectTo: 'user-list', pathMatch: 'full' },
      {
        path: 'user-list',
        component: UserInfoListComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManagerRoutingModule {}

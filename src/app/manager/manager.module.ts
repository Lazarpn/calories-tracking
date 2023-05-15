import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { UserInfoListComponent } from './user-info-list/user-info-list.component';
import { UserInfoComponent } from './user-info-list/user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ManagerComponent, UserInfoListComponent, UserInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManagerRoutingModule,
    SharedModule,
  ],
})
export class ManagerModule {}

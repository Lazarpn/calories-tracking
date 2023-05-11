import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { UserInfoListComponent } from './user-info-list/user-info-list.component';
import { UserInfoComponent } from './user-info-list/user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagerRoutingModule } from './manager-routing.module';

@NgModule({
  declarations: [ManagerComponent, UserInfoListComponent, UserInfoComponent],
  imports: [CommonModule, ReactiveFormsModule, ManagerRoutingModule],
})
export class ManagerModule {}

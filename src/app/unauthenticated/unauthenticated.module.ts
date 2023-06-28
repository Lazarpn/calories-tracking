import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { UnauthenticatedRoutingModule } from './unauthenticated-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, UnauthenticatedRoutingModule],
})
export class UnauthenticatedModule {}

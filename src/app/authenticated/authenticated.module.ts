import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, AuthenticatedRoutingModule],
})
export class AuthenticatedModule {}

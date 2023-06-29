import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModule, AuthenticatedRoutingModule],
})
export class AuthenticatedModule {}

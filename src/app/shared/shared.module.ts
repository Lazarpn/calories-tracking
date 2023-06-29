import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MealsRoutingModule } from '../meals/meals-routing.module';
import { ProfileRoutingModule } from '../profile/profile-routing.module';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { NullToEmptyDirective } from './null-to-empty.directive';

@NgModule({
  declarations: [
    HeaderComponent,
    LoadingSpinnerComponent,
    NullToEmptyDirective,
  ],
  imports: [CommonModule, MealsRoutingModule, ProfileRoutingModule],
  exports: [HeaderComponent, LoadingSpinnerComponent, NullToEmptyDirective],
})
export class SharedModule {}

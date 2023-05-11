import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { MealsRoutingModule } from '../meals/meals-routing.module';
import { ProfileRoutingModule } from '../profile/profile-routing.module';

@NgModule({
  declarations: [HeaderComponent, LoadingSpinnerComponent],
  imports: [CommonModule, MealsRoutingModule, ProfileRoutingModule],
  exports: [HeaderComponent, LoadingSpinnerComponent],
})
export class SharedModule {}

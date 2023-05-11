import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [HeaderComponent, LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [HeaderComponent, LoadingSpinnerComponent],
})
export class SharedModule {}

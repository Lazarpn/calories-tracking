import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MealsRoutingModule } from '../meals/meals-routing.module';
import { ProfileRoutingModule } from '../profile/profile-routing.module';
import { HeaderComponent } from './header/header.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner/loading-spinner.component';
import { NullToEmptyDirective } from './null-to-empty.directive';
import { ImageCropperModalComponent } from './image-cropper-modal/image-cropper-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HeaderComponent,
    LoadingSpinnerComponent,
    NullToEmptyDirective,
    ImageCropperModalComponent,
  ],
  imports: [
    CommonModule,
    MealsRoutingModule,
    ProfileRoutingModule,
    ImageCropperModule,
    MatCommonModule,
    MatDialogModule,
  ],
  exports: [HeaderComponent, LoadingSpinnerComponent, NullToEmptyDirective],
})
export class SharedModule {}

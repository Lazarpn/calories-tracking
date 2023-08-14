import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MealsRoutingModule } from '../meals/meals-routing.module';
import { ProfileRoutingModule } from '../profile/profile-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner/loading-spinner.component';
import { NullToEmptyDirective } from './null-to-empty.directive';
import { ImageCropperModalComponent } from './components/image-cropper-modal/image-cropper-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './loaders/http-loader-factory';
import { HttpClient } from '@angular/common/http';

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
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [HeaderComponent, LoadingSpinnerComponent, NullToEmptyDirective],
})
export class SharedModule {}

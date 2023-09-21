import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner/loading-spinner.component';
import { NullToEmptyDirective } from './null-to-empty.directive';
import { ImageCropperModalComponent } from './components/image-cropper-modal/image-cropper-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './loaders/http-loader-factory';
import { HttpClient } from '@angular/common/http';
import { GoogleSignInComponent } from './components/google-sign-in/google-sign-in.component';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    NullToEmptyDirective,
    ImageCropperModalComponent,
    GoogleSignInComponent,
  ],
  imports: [
    CommonModule,
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
  exports: [LoadingSpinnerComponent, NullToEmptyDirective, GoogleSignInComponent],
})
export class SharedModule {}

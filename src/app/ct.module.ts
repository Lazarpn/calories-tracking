import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CtComponent } from './ct.component';
import { CtRoutingModule } from './ct-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './+auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [CtComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CtRoutingModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule,
    NoopAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 3500 } },
  ],
  bootstrap: [CtComponent],
})
export class CtModule {}

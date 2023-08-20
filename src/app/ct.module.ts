import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CtComponent } from './ct.component';
import { CtRoutingModule } from './ct-routing.module';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './shared/services/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from './shared/loaders/http-loader-factory';
import { HeaderComponent } from './shared/components/header/header.component';

@NgModule({
  declarations: [HeaderComponent, CtComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CtRoutingModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
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

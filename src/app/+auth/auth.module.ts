import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ResetPasswordModalComponent } from './reset-password-modal/reset-password-modal.component';
import { ForgotPasswordModalComponent } from './forgot-password-modal/forgot-password-modal.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../shared/loaders/http-loader-factory';

// FIXME: posebnu komponentu koja prima exception details i koja ce ili da loaduje snackbar ili sta god, passovanje parametra na ngx pogledati kako da radim
// napraviti mesto gde ce user da menja jezik
// prebaciti regexe u konstama i ostale stvari koje treba, u onom fajlu

@NgModule({
  declarations: [AuthComponent, ResetPasswordModalComponent, ForgotPasswordModalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class AuthModule {}

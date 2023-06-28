import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CtComponent } from './ct.component';
import { CtRoutingModule } from './ct-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CanDeactivateGuard } from './meals/meal-list/meal/can-deactivate-guard.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [CtComponent],
  imports: [BrowserModule, CtRoutingModule, SharedModule, HttpClientModule],
  providers: [
    CanDeactivateGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [CtComponent],
})
export class CtModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthenticatedRoutingModule } from './authenticated-routing.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../shared/loaders/http-loader-factory';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    AuthenticatedRoutingModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class AuthenticatedModule {}

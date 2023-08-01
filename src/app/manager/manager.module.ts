import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerComponent } from './manager.component';
import { UserInfoListComponent } from './user-info-list/user-info-list.component';
import { UserInfoComponent } from './user-info-list/user-info/user-info.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManagerRoutingModule } from './manager-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../shared/loaders/http-loader-factory';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [ManagerComponent, UserInfoListComponent, UserInfoComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ManagerRoutingModule,
    SharedModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class ManagerModule {}

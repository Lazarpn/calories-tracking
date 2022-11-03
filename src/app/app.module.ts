import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { HeaderComponent } from './header/header.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, HeaderComponent, SettingsComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

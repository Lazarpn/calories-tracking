import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileCaloriesComponent } from './profile-calories/profile-calories.component';
import { ProfileLanguageComponent } from './profile-language/profile-language.component';

const routes: Routes = [
  { path: '', redirectTo: 'calories', pathMatch: 'full' },
  {
    path: '',
    component: ProfileComponent,
    children: [
      { path: 'calories', component: ProfileCaloriesComponent },
      { path: 'language', component: ProfileLanguageComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}

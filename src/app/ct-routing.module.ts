import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UnauthenticatedModule } from './unauthenticated/unauthenticated.module';
import { AuthenticatedResolver } from './auth/authenticated.resolver';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./unauthenticated/unauthenticated.module').then(
        m => m.UnauthenticatedModule
      ),
    pathMatch: 'full',
  },
  {
    path: '',
    redirectTo: 'meals',
    loadChildren: () =>
      import('./authenticated/authenticated.module').then(
        m => m.AuthenticatedModule
      ),
    resolve: {
      userData: AuthenticatedResolver,
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'meals',
        loadChildren: () =>
          import('./meals/meals.module').then(m => m.MealsModule),
      },
      {
        path: 'manager',
        loadChildren: () =>
          import('./manager/manager.module').then(m => m.ManagerModule),
      },
    ],
  },
  { path: '*', redirectTo: 'auth' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CtRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { UnauthenticatedModule } from './unauthenticated/unauthenticated.module';
import { AuthenticatedResolver } from './auth/authenticated.resolver';
import { AuthenticatedGuard } from './auth/authenticated.guard';
import { UnauthenticatedGuard } from './auth/unauthenticated.guard';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'auth',
    loadChildren: () =>
      import('./unauthenticated/unauthenticated.module').then(
        m => m.UnauthenticatedModule
      ),
    // pathMatch: 'full',
  },
  {
    path: 'meals',
    // redirectTo: 'meals',
    loadChildren: () =>
      import('./authenticated/authenticated.module').then(
        m => m.AuthenticatedModule
      ),
    resolve: {
      userData: AuthenticatedResolver,
    },
    canActivate: [UnauthenticatedGuard],
    children: [],
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

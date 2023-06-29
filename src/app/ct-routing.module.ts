import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthenticatedResolver } from './auth/authenticated.resolver';
import { UnauthenticatedGuard } from './auth/unauthenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
  },
  {
    path: '',  canActivate: [UnauthenticatedGuard],
    resolve: { userData: AuthenticatedResolver },
    loadChildren: () => import('./authenticated/authenticated.module').then(m => m.AuthenticatedModule),
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class CtRoutingModule {}

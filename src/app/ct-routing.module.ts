import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedResolver } from './shared/resolvers/authenticated.resolver';
import { AuthenticatedGuard } from './shared/guards/authenticated.guard';
import { UnauthenticatedGuard } from './shared/guards/unauthenticated.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthenticatedGuard],
    resolve: { userData: AuthenticatedResolver },
    loadChildren: () =>
      import('./+authenticated/authenticated.module').then(m => m.AuthenticatedModule),
  },
  {
    path: 'auth',
    canActivate: [UnauthenticatedGuard],
    loadChildren: () => import('./+auth/auth.module').then(m => m.AuthModule),
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CtRoutingModule {}

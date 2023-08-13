import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedResolver } from './shared/resolvers/authenticated.resolver';
import { UnauthenticatedGuard } from './shared/guards/unauthenticated.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./+auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: '',
    canActivate: [UnauthenticatedGuard],
    resolve: { userData: AuthenticatedResolver },
    loadChildren: () =>
      import('./+authenticated/authenticated.module').then(m => m.AuthenticatedModule),
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CtRoutingModule {}

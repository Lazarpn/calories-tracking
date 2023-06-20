import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../profile/profile.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedResolver implements Resolve<User> {
  private url = environment.url + '/api';
  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<User> | Promise<User> | User {
    FIXME: 'Jel treba ovo ovako?';
    return this.http.get<User>(this.url + '/users/me').pipe(
      tap((user: User) => {
        console.log(user);
      })
    );
  }
}

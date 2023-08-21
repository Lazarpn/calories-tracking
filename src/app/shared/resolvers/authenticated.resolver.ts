import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user/user.model';
import { environment } from 'src/environments/environment';
import { ProfileService } from '../services/profile.service';

@Injectable({ providedIn: 'root' })
export class AuthenticatedResolver implements Resolve<User> {
  private url = environment.url + '/api';

  constructor(
    private http: HttpClient,
    private profileService: ProfileService
  ) {
    console.log('FIXME:popraviti okidanje dvaputa ili sta god');
  }

  resolve(): Observable<User> {
    return this.http.get<User>(this.url + '/users/me').pipe(
      tap((user: User) => {
        this.profileService.setUser(user);
      })
    );
  }
}

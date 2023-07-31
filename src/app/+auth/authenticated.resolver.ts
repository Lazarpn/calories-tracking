import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user/user.model';
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
  resolve(): Observable<User> {
    return this.http.get<User>(this.url + '/users/me').pipe(
      tap((user: User) => {
        this.profileService.setUser(user);
      })
    );
  }
}

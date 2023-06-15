import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  url: string = environment.url + '/api';

  constructor(
    private http: HttpClient,
    private usersService: UsersService,
    private authService: AuthService
  ) {}

  getUsers() {
    this.http
      .get<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        caloriesPreference?: number;
        userPhoto?: string;
      }>(this.url + '/users/admin/all')
      .subscribe(
        (users) => {
          this.usersService.setUsers(users);
        },
        (error) => {
          if (error.status === 403) {
            alert('You are not authorized to access this!');
            this.authService.signOut();
          }
        }
      );
  }

  updateUser(id, firstName, lastName, email, caloriesPreference) {
    this.http
      .put(this.url + `/users/admin/${id}`, {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        caloriesPreference: caloriesPreference,
      })
      .subscribe((data) => {});
  }

  deleteUser(email: string) {
    this.http.delete(this.url + `/users/admin/${email}`).subscribe((res) => {
      this.usersService.onUserDelete(email);
    });
  }
}

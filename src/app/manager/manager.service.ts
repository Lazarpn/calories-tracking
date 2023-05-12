import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  url: string = environment.url + '/api';

  constructor(private http: HttpClient, private usersService: UsersService) {}

  getUsers() {
    this.http
      .get<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        caloriesPreference?: number;
        userPhoto?: string;
      }>(this.url + '/UserAdministrator/all')
      .subscribe((users) => {
        console.log(users);
        this.usersService.setUsers(users);
      });
  }

  updateUser(id, firstName, lastName, email, caloriesPreference) {
    this.http
      .put(this.url + `/UserAdministrator/${id}`, {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        caloriesPreference: caloriesPreference,
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  deleteUser(email: string) {
    this.http
      .delete(this.url + `/UserAdministrator/${email}`)
      .subscribe((res) => {
        this.usersService.onUserDelete(email);
      });
  }
}

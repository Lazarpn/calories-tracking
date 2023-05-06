import { Injectable } from '@angular/core';
import { ManagerService } from './manager.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url: string = environment.url + '/api';

  users: any;
  usersChanged = new Subject<any>();

  constructor(
    private managerService: ManagerService,
    private http: HttpClient
  ) {}

  getUsers() {
    this.managerService.getUsers().subscribe((users) => {
      this.users = users;
      this.usersChanged.next(this.users);
    });
  }

  onUserUpdate(id, firstName, lastName, email, caloriesPreference) {
    this.managerService
      .updateUser(id, firstName, lastName, email, caloriesPreference)
      .subscribe((res) => {
        console.log('uspesno');
      });
  }

  onUserDelete(user) {
    this.managerService.deleteUser(user.email).subscribe((res) => {
      const userPosition = this.users.indexOf(user);
      this.users.splice(userPosition, 1);
      this.usersChanged.next(this.users);
    });
  }
}

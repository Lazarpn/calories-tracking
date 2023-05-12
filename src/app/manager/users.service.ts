import { Injectable } from '@angular/core';
import { ManagerService } from './manager.service';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  users: any;
  usersChanged = new Subject<any>();

  constructor() {}

  setUsers(users) {
    this.users = users;
    this.usersChanged.next(users);
  }

  getUsers() {
    return this.users;
  }

  onUserDelete(email) {
    const user = this.users.find((u) => u.email == email);
    const userPosition = this.users.indexOf(user);
    this.users.splice(userPosition, 1);
    this.usersChanged.next(this.users);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../shared/models/user/user.model';
import { UserAdminUpdate } from '../shared/models/user/user-admin-update.model';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  users: User[];
  usersChanged = new Subject<User[]>();

  constructor() {}

  setUsers(users: User[]) {
    this.users = users;
    this.usersChanged.next(users);
  }

  getUsers(): User[] {
    return this.users;
  }

  deleteUser(email: string) {
    const user = this.users.find(u => u.email == email);
    const userPosition = this.users.indexOf(user);
    this.users.splice(userPosition, 1);
    this.usersChanged.next(this.users);
  }

  updateUser(model: UserAdminUpdate) {
    const index = this.users.indexOf(
      this.users.find(u => u.email === model.email)
    );
    this.users[index].email = model.email;
    this.users[index].caloriesPreference = model.caloriesPreference;
    this.users[index].firstName = model.firstName;
    this.users[index].lastName = model.lastName;

    this.usersChanged.next(this.users);
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserAdminUpdateModel } from '../models/user/user-admin-update-model';
import { UserAdminModel } from '../models/user/user-admin-model';
import { ExceptionDetail } from '../models/exception-detail';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  users: UserAdminModel[];
  usersChanged = new Subject<UserAdminModel[]>();

  constructor() {}

  setUsersErrors(exceptions: ExceptionDetail[]) {
    this.usersChanged.error(exceptions);
  }

  setUsers(users: UserAdminModel[]) {
    this.users = users;
    this.usersChanged.next(users);
  }

  getUsers(): UserAdminModel[] {
    return this.users;
  }

  deleteUser(email: string) {
    const user = this.users.find(u => u.email == email);
    const userPosition = this.users.indexOf(user);
    this.users.splice(userPosition, 1);
    this.usersChanged.next(this.users);
  }

  updateUser(model: UserAdminUpdateModel) {
    const index = this.users.indexOf(this.users.find(u => u.email === model.email));
    this.users[index].email = model.email;
    this.users[index].caloriesPreference = model.caloriesPreference;
    this.users[index].firstName = model.firstName;
    this.users[index].lastName = model.lastName;

    this.usersChanged.next(this.users);
  }
}

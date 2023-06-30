import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ManagerService } from './manager.service';
import { User } from '../shared/models/user/user.model';
import { UserAdminUpdate } from '../shared/models/user/user-admin-update.model';

@Injectable({
  providedIn: 'root',
})
export class ManagerDataService {
  url: string = environment.url + '/api';

  constructor(
    private http: HttpClient,
    private managerService: ManagerService
  ) {}

  getUsers() {
    this.http
      .get<User[]>(this.url + '/users/admin/all')
      .subscribe(users => this.managerService.setUsers(users));
  }

  updateUser(model: UserAdminUpdate) {
    this.http
      .put<HttpResponse<204>>(this.url + `/users/admin/${model.email}`, {
        email: model.email,
        firstName: model.firstName,
        lastName: model.lastName,
        caloriesPreference: model.caloriesPreference,
      })
      .subscribe(res => this.managerService.updateUser(model));
  }

  deleteUser(email: string) {
    this.http
      .delete<HttpResponse<204>>(this.url + `/users/admin/${email}`)
      .subscribe(res => this.managerService.deleteUser(email));
  }
}

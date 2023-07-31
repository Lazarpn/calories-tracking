import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ManagerService } from './manager.service';
import { UserAdminUpdateModel } from '../shared/models/user/user-admin-update-model';
import { UserAdminModel } from '../shared/models/user/user-admin-model';

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
      .get<UserAdminModel[]>(this.url + '/users/admin/all')
      .subscribe(users => this.managerService.setUsers(users));
  }

  updateUser(model: UserAdminUpdateModel) {
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

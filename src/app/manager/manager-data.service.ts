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
    this.http.get<UserAdminModel[]>(this.url + '/users/admin/all').subscribe({
      next: users => this.managerService.setUsers(users),
      // FIXME: kad vidim za error-e sta radim
    });
  }

  updateUser(model: UserAdminUpdateModel) {
    this.http.put<void>(this.url + `/users/admin/${model.email}`, model).subscribe({
      next: _ => this.managerService.updateUser(model),
    });
  }

  deleteUser(email: string) {
    this.http.delete<void>(this.url + `/users/admin/${email}`).subscribe({
      next: _ => this.managerService.deleteUser(email),
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ManagerService } from './manager.service';
import { UserAdminUpdateModel } from '../models/user/user-admin-update-model';
import { UserAdminModel } from '../models/user/user-admin-model';
import { ExceptionDetail } from '../models/exception-detail';

@Injectable({ providedIn: 'root' })
export class ManagerDataService {
  url: string = `${environment.url}/api`;

  constructor(
    private http: HttpClient,
    private managerService: ManagerService
  ) {}

  getUsers() {
    this.http.get<UserAdminModel[]>(`${this.url}/users/admin/all`).subscribe({
      next: users => this.managerService.setUsers(users),
    });
  }

  updateUser(model: UserAdminUpdateModel) {
    this.http.put<void>(`${this.url}/users/admin/${model.email}`, model).subscribe({
      next: _ => this.managerService.updateUser(model),
      error: (exceptions: ExceptionDetail[]) => this.managerService.setUsersErrors(exceptions),
    });
  }

  deleteUser(email: string) {
    this.http.delete<void>(`${this.url}/users/admin/${email}`).subscribe({
      next: _ => this.managerService.deleteUser(email),
      error: (exceptions: ExceptionDetail[]) => this.managerService.setUsersErrors(exceptions),
    });
  }
}

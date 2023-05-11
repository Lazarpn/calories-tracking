import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  url: string = environment.url + '/api';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<{
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      caloriesPreference?: number;
      userPhoto?: string;
    }>(this.url + '/UserAdministrator/all');
  }

  updateUser(id, firstName, lastName, email, caloriesPreference) {
    return this.http.put(this.url + `/UserAdministrator/${id}`, {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      caloriesPreference: caloriesPreference,
    });
  }

  deleteUser(email: string) {
    return this.http.delete(this.url + `/UserAdministrator/${email}`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  url: string = environment.url + '/api';
  usersList: any;
  isLoading: boolean = true;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<{
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        caloriesPreference?: number;
        userPhoto?: string;
      }>(this.url + '/Account/all')
      .subscribe((users) => {
        this.usersList = users;
        this.isLoading = false;
      });
  }
}

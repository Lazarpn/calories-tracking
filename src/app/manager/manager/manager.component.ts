import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UsersService } from '../users.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  url: string = environment.url + '/api';
  usersList: any;
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private http: HttpClient,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersList = this.usersService.getUsers();

    this.usersService.usersChanged.subscribe((users) => {
      this.usersList = users;
      this.isLoading = false;
    });
  }
}

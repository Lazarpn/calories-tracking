import { Component, Input, OnInit } from '@angular/core';
import { ManagerUsersService } from '../manager-users.service';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'ct-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrls: ['./user-info-list.component.scss'],
})
export class UserInfoListComponent implements OnInit {
  isLoading: boolean = true;
  @Input() usersList: any[];
  constructor(
    private managerUsersService: ManagerUsersService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.usersList = this.managerUsersService.getUsers();

    if (!this.usersList) {
      this.managerService.getUsers();
    }

    if (this.usersList) {
      this.isLoading = false;
    }

    this.managerUsersService.usersChanged.subscribe(users => {
      this.usersList = users;
      this.isLoading = false;
    });
  }
}

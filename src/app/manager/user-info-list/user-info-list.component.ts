import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ManagerService } from '../manager.service';

@Component({
  selector: 'app-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrls: ['./user-info-list.component.scss'],
})
export class UserInfoListComponent implements OnInit {
  isLoading: boolean = true;
  @Input() usersList: any[];
  constructor(
    private usersService: UsersService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.usersList = this.usersService.getUsers();

    if (!this.usersList) {
      this.managerService.getUsers();
    }

    if (this.usersList) {
      this.isLoading = false;
    }

    this.usersService.usersChanged.subscribe((users) => {
      this.usersList = users;
      this.isLoading = false;
    });
  }
}

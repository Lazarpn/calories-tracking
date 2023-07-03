import { Component, Input, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { ManagerDataService } from '../manager-data.service';
import { User } from 'src/app/shared/models/user/user.model';

@Component({
  selector: 'ct-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrls: ['./user-info-list.component.scss'],
})
export class UserInfoListComponent implements OnInit {
  isLoading: boolean = true;
  @Input() usersList: User[];
  constructor(
    private managerDataService: ManagerDataService,
    private managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.usersList = this.managerService.getUsers();

    if (!this.usersList) {
      this.managerDataService.getUsers();
    }

    if (this.usersList) {
      this.isLoading = false;
    }

    this.managerService.usersChanged.subscribe((users: User[]) => {
      this.usersList = users;
      this.isLoading = false;
    });
  }
}

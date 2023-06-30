import { Component, Input, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { ManagerDataService } from '../manager-data.service';

@Component({
  selector: 'ct-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrls: ['./user-info-list.component.scss'],
})
export class UserInfoListComponent implements OnInit {
  isLoading: boolean = true;
  @Input() usersList: any[];
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

    this.managerService.usersChanged.subscribe(users => {
      this.usersList = users;
      this.isLoading = false;
    });
  }
}

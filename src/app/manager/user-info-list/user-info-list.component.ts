import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { ManagerDataService } from '../manager-data.service';
import { UserAdminModel } from 'src/app/shared/models/user/user-admin-model';

@Component({
  selector: 'ct-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrls: ['./user-info-list.component.scss'],
})
export class UserInfoListComponent implements OnInit {
  isLoading: boolean = true;
  usersList: UserAdminModel[];
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

    //FIXME: pitanje da li i ovde treba sa next-om na route-params i da li se handla error i ovde?
    this.managerService.usersChanged.subscribe({
      next: (users: UserAdminModel[]) => {
        this.usersList = users;
        this.isLoading = false;
      },
    });
  }
}

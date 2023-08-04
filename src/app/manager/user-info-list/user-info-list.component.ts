import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../manager.service';
import { ManagerDataService } from '../manager-data.service';
import { UserAdminModel } from 'src/app/shared/models/user/user-admin-model';
import { ExceptionDetail } from 'src/app/shared/models/exception-detail';
import { UtilityService } from 'src/app/shared/utility.service';
import { TranslationMessage } from 'src/app/shared/models/translation-message';

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
    private managerService: ManagerService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.usersList = this.managerService.getUsers();

    if (!this.usersList) {
      this.managerDataService.getUsers();
    }

    if (this.usersList) {
      this.isLoading = false;
    }

    this.managerService.usersChanged.subscribe({
      next: (users: UserAdminModel[]) => {
        this.usersList = users;
        this.isLoading = false;
      },
      error: (exceptions: ExceptionDetail[]) => {
        const errorMessages: TranslationMessage[] =
          this.utilityService.getErrorMessages(exceptions);
        this.utilityService.displaySnackBarErrors(errorMessages);
      },
    });
  }
}

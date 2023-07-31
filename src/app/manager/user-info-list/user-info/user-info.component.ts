import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManagerDataService } from '../../manager-data.service';
import { ManagerService } from '../../manager.service';
import { User } from 'src/app/shared/models/user/user.model';
import { UserAdminModel } from 'src/app/shared/models/user/user-admin-model';

@Component({
  selector: 'ct-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: UserAdminModel;
  userForm: FormGroup;
  changesSaved: boolean = true;
  constructor(private managerDataService: ManagerDataService) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl({
        value: this.user.email,
        disabled: true,
      }),
      firstName: new FormControl({
        value: this.user.firstName,
        disabled: true,
      }),
      lastName: new FormControl({
        value: this.user.lastName,
        disabled: true,
      }),
      caloriesPreference: new FormControl({
        value: this.user.caloriesPreference,
        disabled: true,
      }),
    });
  }

  onSubmit() {}

  onUserEdit() {
    this.changesSaved = false;
    this.userForm.enable();
  }

  onUserDelete() {
    this.managerDataService.deleteUser(this.user.email);
  }

  onInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }

  onUserConfirm() {
    this.changesSaved = true;
    this.userForm.disable();
    this.user.firstName = this.userForm.get('firstName').value;
    this.user.lastName = this.userForm.get('lastName').value;
    this.user.email = this.userForm.get('email').value;
    this.user.caloriesPreference = this.userForm.get('caloriesPreference').value;
    if (!this.user.caloriesPreference) {
      this.userForm.controls['caloriesPreference'].setValue(0);
      this.user.caloriesPreference = 0;
    }

    this.managerDataService.updateUser(this.user);
  }
}

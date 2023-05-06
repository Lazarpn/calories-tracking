import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ManagerService } from '../../manager.service';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: any;
  userForm: FormGroup;
  isDisabled: boolean = true;
  changesSaved: boolean = true;
  constructor(
    private managerService: ManagerService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl({ value: this.user.email, disabled: true }),
      firstName: new FormControl({
        value: this.user.firstName,
        disabled: true,
      }),
      lastName: new FormControl({ value: this.user.lastName, disabled: true }),
      caloriesPreference: new FormControl({
        value: this.user.caloriesPreference,
        disabled: true,
      }),
    });
  }

  onSubmit() {}

  onUserEdit() {
    this.changesSaved = false;
    this.userForm.get('firstName').enable();
    this.userForm.get('lastName').enable();
    this.userForm.get('email').enable();
    this.userForm.get('caloriesPreference').enable();
  }

  onUserDelete() {
    this.usersService.onUserDelete(this.user);
  }

  onUserConfirm() {
    this.changesSaved = true;
    this.userForm.get('firstName').disable();
    this.userForm.get('lastName').disable();
    this.userForm.get('email').disable();
    this.userForm.get('caloriesPreference').disable();

    const firstName = this.userForm.get('firstName').value;
    const lastName = this.userForm.get('lastName').value;
    const email = this.userForm.get('email').value;
    const caloriesPreference = this.userForm.get('caloriesPreference').value;

    this.usersService.onUserUpdate(
      this.user.id,
      firstName,
      lastName,
      email,
      caloriesPreference
    );
  }
}

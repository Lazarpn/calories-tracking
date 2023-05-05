import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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
  constructor() {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      email: new FormControl(this.user.email),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      caloriesPreference: new FormControl(this.user.caloriesPreference),
    });
  }

  onSubmit() {}

  onUserEdit() {
    this.changesSaved = false;
  }

  onUserDelete() {}

  onUserConfirm() {
    this.changesSaved = true;
  }
}

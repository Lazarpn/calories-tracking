import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInfo } from 'src/app/shared/userInfo.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  @Input() user: UserInfo;
  userForm: FormGroup;
  isDisabled: boolean = true;
  changesSaved: boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      photo: new FormControl(null),
      name: new FormControl(null),
      surname: new FormControl(null),
      mealsPreference: new FormControl(null),
    });
  }

  onSubmit() {}

  onUserEdit() {}

  onUserDelete() {}
}

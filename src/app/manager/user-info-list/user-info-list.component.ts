import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/shared/userInfo.model';

@Component({
  selector: 'app-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrls: ['./user-info-list.component.scss'],
})
export class UserInfoListComponent implements OnInit {
  @Input() usersList: UserInfo[];
  constructor() {}

  ngOnInit(): void {}
}

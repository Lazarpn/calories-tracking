import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfo } from 'src/app/shared/userInfo.model';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  usersList: UserInfo[] = [
    new UserInfo('f', 'f', 'f', 3),
    new UserInfo('f', 'f', 'f', 3),
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}
}

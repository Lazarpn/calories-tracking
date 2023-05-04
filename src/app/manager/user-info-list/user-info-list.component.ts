import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-info-list',
  templateUrl: './user-info-list.component.html',
  styleUrls: ['./user-info-list.component.scss'],
})
export class UserInfoListComponent implements OnInit {
  @Input() usersList: any[];
  constructor() {}

  ngOnInit(): void {}
}

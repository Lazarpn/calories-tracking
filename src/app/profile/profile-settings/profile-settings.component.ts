import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSettingsService } from '../user-settings.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  isEditMode: boolean = false;
  caloriesPreference: number;
  constructor(
    private userSettingsService: UserSettingsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    this.caloriesPreference = userInfo.caloriesPreference;
  }

  onCaloriesEdit() {
    this.isEditMode = true;
  }

  onCaloriesConfirm() {
    this.isEditMode = false;
    const userId = this.authService.userId;
    const caloriesPreference = this.form.value.caloriesPreference;
    this.userSettingsService.changeCalories(userId, caloriesPreference);
  }
}

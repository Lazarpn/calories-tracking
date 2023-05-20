import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'ct-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  isEditMode: boolean = false;
  caloriesPreference: number;
  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    this.caloriesPreference = userInfo.caloriesPreference;
  }
  onInput(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, '');
  }

  onCaloriesEdit() {
    this.isEditMode = true;
  }

  onCaloriesConfirm() {
    this.isEditMode = false;
    const userId = this.authService.userId;
    const caloriesPreference = this.form.value.caloriesPreference;
    this.profileService.changeCalories(userId, caloriesPreference);
  }
}

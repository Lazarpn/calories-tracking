import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from '../profile.service';
import { AuthService } from 'src/app/+auth/auth.service';
import { UserCaloriesModel } from 'src/app/shared/models/user/user-calories-model';

@Component({
  selector: 'ct-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  // @ViewChild('form', { static: true }) form: NgForm;
  isEditMode: boolean = false;
  model: UserCaloriesModel;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.model = {
      caloriesPreference: this.profileService.getUserCalories(),
    };
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
    this.profileService.updateUserCalories(this.model);
  }
}

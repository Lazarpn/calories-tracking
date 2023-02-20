import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSettingsService } from '../../shared/user-settings.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  preferenceApplied: boolean = true;
  preferenceCalories: number;
  isEditMode: boolean = false;

  constructor(private userSettings: UserSettingsService) {}

  ngOnInit(): void {}

  onPreferenceChange() {
    this.preferenceApplied = !this.form.value.preference;
    this.userSettings.onChangeCaloriesPreference(this.preferenceApplied);
  }

  onCaloriesEdit() {
    this.isEditMode = true;
  }

  onCaloriesConfirm() {
    this.isEditMode = false;
    this.preferenceCalories = this.form.value.calories;
  }
}

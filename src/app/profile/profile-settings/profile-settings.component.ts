import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserSettingsService } from '../user-settings.service';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  preferenceApplied: boolean;
  preferenceCalories: number;
  isEditMode: boolean = false;

  constructor(private userSettingsService: UserSettingsService) {}

  ngOnInit(): void {
    this.userSettingsService.caloriesPreferenceChanged.subscribe(
      (settings: { preferenceApplied: boolean; caloriesNumber: number }) => {
        this.preferenceApplied = settings.preferenceApplied;
        this.preferenceCalories = settings.caloriesNumber;
      }
    );

    this.userSettingsService.onGetUserSettings();

    this.preferenceApplied = this.userSettingsService.caloriesPreference;
    this.preferenceCalories = this.userSettingsService.preferenceCalories;
  }

  onPreferenceChange() {
    this.preferenceApplied = !this.form.value.preference;
    this.userSettingsService.onChangeCaloriesPreference(this.preferenceApplied);
    this.userSettingsService.onSetUserSettings();
  }

  onCaloriesEdit() {
    this.isEditMode = true;
  }

  onCaloriesConfirm() {
    this.isEditMode = false;
    this.preferenceCalories = this.form.value.calories;
    this.userSettingsService.onChangeCaloriesPreference(
      this.preferenceApplied,
      this.preferenceCalories
    );
    this.userSettingsService.onSetUserSettings();
  }
}

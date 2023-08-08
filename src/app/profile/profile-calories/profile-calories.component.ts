import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { UserCaloriesModel } from 'src/app/shared/models/user/user-calories-model';
import { POSITIVE_DIGIT_PATTERN } from 'src/app/shared/constants';

@Component({
  selector: 'ct-profile-calories',
  templateUrl: './profile-calories.component.html',
  styleUrls: ['./profile-calories.component.scss'],
})
export class ProfileCaloriesComponent implements OnInit {
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
    event.target.value = input.replace(POSITIVE_DIGIT_PATTERN, '');
  }

  onCaloriesEdit() {
    this.isEditMode = true;
  }

  onCaloriesConfirm() {
    this.isEditMode = false;
    this.profileService.updateUserCalories(this.model);
  }
}

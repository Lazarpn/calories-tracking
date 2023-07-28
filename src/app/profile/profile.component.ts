import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user/user.model';
import { UserPhotoUploadModel } from '../shared/models/user/user-photo-upload-model';
import { UtilityService } from '../shared/utility.service';

@Component({
  selector: 'ct-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.isEditMode) {
      const answer = confirm('Do you want to discard changes?');
      if (answer) {
        this.isEditMode = false;
        this.form.disable();
        this.form.controls['firstName'].setValue(this.beforeEditName);
        this.form.controls['lastName'].setValue(this.beforeEditSurname);
      }
    }
  }
  form: FormGroup;
  imageSrc: string;
  isEditMode: boolean = false;
  beforeEditName: string;
  beforeEditSurname: string;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const userInfo = this.profileService.getUserInfo();
    this.profileService
      .getUserPhoto()
      .subscribe(model => (this.imageSrc = model.fileUrl));
    this.form = new FormGroup({
      firstName: new FormControl({
        value: userInfo.firstName,
        disabled: true,
      }),
      lastName: new FormControl({ value: userInfo.lastName, disabled: true }),
    });
  }

  onUploadPhoto(event) {
    const fileRead: File = event.target.files[0];
    const model: UserPhotoUploadModel = {
      file: fileRead,
    };

    this.profileService
      .uploadUserPhoto(model)
      .subscribe(model => (this.imageSrc = model.fileUrl));
  }

  onInfoConfirm() {
    this.isEditMode = false;
    this.form.disable();
    const firstName = this.form.get('firstName').value;
    const lastName = this.form.get('lastName').value;
    this.profileService.updateUserInfo(firstName, lastName);
  }

  onInfoEdit() {
    this.isEditMode = true;
    this.form.enable();
    this.beforeEditName = this.form.get('firstName').value;
    this.beforeEditSurname = this.form.get('lastName').value;
  }

  onSubmit() {}

  ngOnDestroy(): void {}
}

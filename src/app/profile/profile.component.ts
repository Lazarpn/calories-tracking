import { Component, OnInit, ViewChild, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from './profile.service';
import { Subscription } from 'rxjs';
import { User } from '../shared/models/user/user.model';
import { UserPhotoUploadModel } from '../shared/models/user/user-photo-upload-model';
import { UtilityService } from '../shared/utility.service';
import { ImageCropperModalComponent } from '../shared/image-cropper-modal/image-cropper-modal.component';
import { UserUpdateModel } from '../shared/models/user/user-update-model';

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

    this.imageSrc = this.profileService.userPhoto;

    //FIXME: pitanje da li i ovde treba sa next-om na route-params i da li se handla error i ovde?
    this.profileService.userPhotoChanged.subscribe({
      next: url => (this.imageSrc = url),
    });

    if (!this.imageSrc) {
      this.profileService.getUserPhoto();
    }

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

    this.profileService.uploadUserPhoto(model).subscribe(model => (this.imageSrc = model.fileUrl));
  }

  onInfoEdit() {
    this.isEditMode = true;
    this.form.enable();
    this.beforeEditName = this.form.get('firstName').value;
    this.beforeEditSurname = this.form.get('lastName').value;
  }

  onSubmit() {
    this.isEditMode = false;
    this.form.disable();

    const model: UserUpdateModel = {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
    };

    this.profileService.updateUserInfo(model);
  }

  ngOnDestroy(): void {}
}

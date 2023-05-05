import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserSettingsService } from './user-settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  form: FormGroup;
  imageSrc: any = '';
  isPhotoUploaded: boolean;
  isEditMode: boolean = false;
  userInfoSub: Subscription;
  constructor(
    private sanitizer: DomSanitizer,
    private userSettingsService: UserSettingsService
  ) {}

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    this.form = new FormGroup({
      firstName: new FormControl({ value: userInfo.firstName, disabled: true }),
      lastName: new FormControl({ value: userInfo.lastName, disabled: true }),
    });

    const binaryString = userInfo.userPhoto;
    this.imageSrc = binaryString;
  }

  onUploadPhoto(event) {
    // console.log(event);
    const uploadedImage = URL.createObjectURL(event.target.files[0]);
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(uploadedImage);
    this.imageSrc = sanitizedUrl;
    this.isPhotoUploaded = true;

    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const binaryString = reader.result as string;
      this.userSettingsService.uploadPhoto(binaryString);
    };
  }

  onInfoConfirm() {
    this.isEditMode = false;
    this.form.get('firstName').disable();
    this.form.get('lastName').disable();
    const firstName = this.form.get('firstName').value;
    const lastName = this.form.get('lastName').value;

    // NEED LOGIC TO SAVE IT TO THE BACKEND
    this.userSettingsService.changeUserInfo(firstName, lastName);
  }

  onInfoEdit() {
    this.isEditMode = true;
    this.form.get('firstName').enable();
    this.form.get('lastName').enable();
  }

  onSubmit() {}

  ngOnDestroy(): void {}
}

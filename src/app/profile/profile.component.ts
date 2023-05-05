import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
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
  imageSrc: SafeUrl = '';
  isPhotoUploaded: boolean;
  isEditMode: boolean = false;
  name: string;
  surname: string;
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

    //NE ZNAM STA JE OVO
    this.userInfoSub = this.userSettingsService.userInfoChanged.subscribe(
      (userInfo: { name: string; surname: string }) => {
        this.name = userInfo.name;
        this.surname = userInfo.surname;
      }
    );

    this.userSettingsService.userPhotoChanged.subscribe((photo) => {
      this.imageSrc = photo;
    });
    this.userSettingsService.onGetUserPhoto();
    this.userSettingsService.onGetUserInfo();
    this.name = this.userSettingsService.name;
    this.surname = this.userSettingsService.surname;
  }

  onUpload(event) {
    const uploadedImage = URL.createObjectURL(event.target.files[0]);
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(uploadedImage);
    this.userSettingsService.onStoreUserPhoto(sanitizedUrl);
    this.imageSrc = sanitizedUrl;
    this.isPhotoUploaded = true;
  }

  onInfoConfirm() {
    this.isEditMode = false;
    this.form.get('firstName').disable();
    this.form.get('lastName').disable();
    // NEED LOGIC TO SAVE IT TO THE BACKEND
    this.userSettingsService.onSetUserInfo(this.name, this.surname);
  }

  onInfoEdit() {
    this.isEditMode = true;
    this.form.get('firstName').enable();
    this.form.get('lastName').enable();
  }

  onSubmit() {}

  ngOnDestroy(): void {
    this.userInfoSub.unsubscribe();
  }
}

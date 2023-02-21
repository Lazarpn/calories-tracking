import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserSettingsService } from './user-settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: true }) form: NgForm;
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
    this.userInfoSub = this.userSettingsService.userInfoChanged.subscribe(
      (userInfo: { name: string; surname: string }) => {
        this.name = userInfo.name;
        this.surname = userInfo.surname;
      }
    );

    this.userSettingsService.onGetUserInfo();
    this.name = this.userSettingsService.name;
    this.surname = this.userSettingsService.surname;
  }

  onSubmit(form) {
    console.log(form);
  }

  onUpload(event) {
    let uploadedImage = URL.createObjectURL(event.target.files[0]);
    let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(uploadedImage);
    this.imageSrc = sanitizedUrl;
    this.isPhotoUploaded = true;
  }

  onInfoConfirm() {
    this.isEditMode = false;
    this.name = this.form.value.name;
    this.surname = this.form.value.surname;
    this.userSettingsService.onSetUserInfo(this.name, this.surname);
  }

  onInfoEdit() {
    this.isEditMode = true;
  }

  ngOnDestroy(): void {
    this.userInfoSub.unsubscribe();
  }
}

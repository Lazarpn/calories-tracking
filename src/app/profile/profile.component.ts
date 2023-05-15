import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef,
  HostListener,
} from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UserSettingsService } from './user-settings.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ct-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @HostListener('document:keydown.escape', ['$event']) onEscape(
    event: KeyboardEvent
  ) {
    if (this.isEditMode) {
      const answer = confirm('Do you want to discard changes?');
      if (answer) {
        this.isEditMode = false;
        this.form.get('firstName').disable();
        this.form.controls['firstName'].setValue(this.beforeEditName);
        this.form.get('lastName').disable();
        this.form.controls['lastName'].setValue(this.beforeEditSurname);
      }
    }
  }

  form: FormGroup;
  imageSrc: any = '';
  isPhotoUploaded: boolean;
  isEditMode: boolean = false;
  userInfoSub: Subscription;
  beforeEditName: string;
  beforeEditSurname: string;
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

    const binaryString = atob(userInfo.userPhoto);
    this.imageSrc = binaryString;
  }

  onUploadPhoto(event) {
    const uploadedImage = URL.createObjectURL(event.target.files[0]);
    const sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(uploadedImage);
    this.imageSrc = sanitizedUrl;
    this.isPhotoUploaded = true;

    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const binaryString = reader.result as string;
      const base64 = btoa(binaryString);
      this.userSettingsService.uploadPhoto(base64);
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
    this.beforeEditName = this.form.get('firstName').value;
    this.beforeEditSurname = this.form.get('lastName').value;
  }

  onSubmit() {}

  ngOnDestroy(): void {}
}

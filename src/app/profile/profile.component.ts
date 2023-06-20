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
import { ProfileService } from './profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ct-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('image') imageEl: ElementRef;
  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
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
  imageError: boolean = false;
  form: FormGroup;
  imageSrc: string;
  isPhotoUploaded: boolean;
  isEditMode: boolean = false;
  userInfoSub: Subscription;
  beforeEditName: string;
  beforeEditSurname: string;
  constructor(
    private sanitizer: DomSanitizer,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    const userInfo = JSON.parse(localStorage.getItem('userData'));
    this.form = new FormGroup({
      firstName: new FormControl({ value: userInfo.firstName, disabled: true }),
      lastName: new FormControl({ value: userInfo.lastName, disabled: true }),
    });

    this.imageSrc = this.profileService.getPhoto();

    if (!this.imageSrc) {
      this.profileService.fetchPhoto();
    }

    this.profileService.userPhotoChanged.subscribe((photo: string) => {
      this.imageSrc = atob(photo);
    });
  }

  onUploadPhoto(event) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imageError = false;
      const binaryString = reader.result as string;
      this.imageSrc = binaryString;
      this.imageEl.nativeElement.onload = () => {
        const base64 = btoa(binaryString);
        this.profileService.uploadPhoto(base64);
      };
      this.imageEl.nativeElement.onerror = error => {
        this.imageError = true;
        alert("We couldn't upload this photo, try another one!");
      };
    };
  }

  onInfoConfirm() {
    this.isEditMode = false;
    this.form.get('firstName').disable();
    this.form.get('lastName').disable();
    const firstName = this.form.get('firstName').value;
    const lastName = this.form.get('lastName').value;

    // NEED LOGIC TO SAVE IT TO THE BACKEND
    this.profileService.setUserInfo(firstName, lastName);
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

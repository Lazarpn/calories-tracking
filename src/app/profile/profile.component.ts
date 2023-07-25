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
        this.form.disable();
        this.form.controls['firstName'].setValue(this.beforeEditName);
        this.form.controls['lastName'].setValue(this.beforeEditSurname);
      }
    }
  }
  imageError: boolean = false;
  form: FormGroup;
  imageSrc: string;
  isPhotoUploaded: boolean;
  isEditMode: boolean = false;
  beforeEditName: string;
  beforeEditSurname: string;
  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    const userInfo = this.profileService.getUserInfo();
    this.form = new FormGroup({
      firstName: new FormControl({
        value: userInfo.firstName,
        disabled: true,
      }),
      lastName: new FormControl({ value: userInfo.lastName, disabled: true }),
    });
  }

  onUploadPhoto(event) {
    // const file: File = event.target.files[0];
    // const reader = new FileReader();
    // reader.readAsDataURL(file);
    // reader.onload = () => {
    //   this.imageError = false;
    //   const binaryString = reader.result as string;
    //   this.imageSrc = binaryString;
    //   this.imageEl.nativeElement.onload = () => {
    //     const base64 = btoa(binaryString);
    //     this.profileService.uploadPhoto(base64);
    //   };
    //   this.imageEl.nativeElement.onerror = error => {
    //     this.imageError = true;
    //     alert("We couldn't upload this photo, try another one!");
    //   };
    // };
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

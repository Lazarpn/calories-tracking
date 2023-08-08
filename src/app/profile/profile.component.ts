import { Component, OnInit, ViewChild, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from './profile.service';
import { UserPhotoUploadModel } from '../shared/models/user/user-photo-upload-model';
import {
  ImageCropperModalComponent,
  ImageCropperModalDialogData,
} from '../shared/image-cropper-modal/image-cropper-modal.component';
import { UserUpdateModel } from '../shared/models/user/user-update-model';
import { base64ToFile } from 'ngx-image-cropper';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ct-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  @HostListener('document:keydown.escape', ['$event']) onEscape() {
    if (this.isEditMode && confirm('Do you want to discard changes?')) {
      this.isEditMode = false;
      this.form.disable();
      this.form.controls['firstName'].setValue(this.beforeEditName);
      this.form.controls['lastName'].setValue(this.beforeEditSurname);
    }
  }
  form: FormGroup;
  imageUrl: string;
  isEditMode: boolean = false;
  beforeEditName: string;
  beforeEditSurname: string;

  constructor(
    private profileService: ProfileService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const userInfo = this.profileService.getUserInfo();
    this.imageUrl = this.profileService.userPhoto;

    this.profileService.userPhotoChanged.subscribe({
      next: url => (this.imageUrl = url),
    });

    if (!this.imageUrl) {
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

  onUploadPhoto(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input || !input.files || input.files.length === 0) {
      return;
    }

    const fileName = input.files[0].name.replace(/\.[^/.]+$/, '');

    const dialogRef = this.dialog.open(ImageCropperModalComponent, {
      width: '600px',
      panelClass: 'fullscreen-dialog',
      data: {
        event: event,
      } as ImageCropperModalDialogData,
    });

    dialogRef.afterClosed().subscribe(base64Image => {
      if (!base64Image) {
        this.fileInput.nativeElement.value = '';
        return;
      }

      const croppedImageBlob = base64ToFile(base64Image);
      const fileSelected = new File([croppedImageBlob], `${fileName}.jpeg`, { type: 'image/jpeg' });

      const model: UserPhotoUploadModel = {
        file: fileSelected,
      };
      this.profileService.uploadUserPhoto(model);

      const reader = new FileReader();

      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.imageUrl = base64Image;
      };

      reader.readAsDataURL(fileSelected);
      this.fileInput.nativeElement.value = '';
    });
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

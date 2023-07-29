import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

export interface ImageCropperModalDialogData {
  event: Event;
  isCoverImage: boolean;
}

@Component({
  selector: 'ct-image-cropper-modal',
  templateUrl: './image-cropper-modal.component.html',
  styleUrls: ['./image-cropper-modal.component.scss'],
})
export class ImageCropperModalComponent {
  event: Event;
  croppedImage: string = '';
  showCropper = false;
  isCoverImage = false;

  constructor(
    // private toastService: ToastService,
    @Inject(MAT_DIALOG_DATA) public data: ImageCropperModalDialogData,
    private dialogRef: MatDialogRef<ImageCropperModalComponent>
  ) {
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = (data as any)[key];
        (this as any)[key] = element;
      }
    }
  }

  onSave() {
    this.dialogRef.close(this.croppedImage);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  loadImageFailed() {
    this.onCancel();
    // this.toastService.error(
    //   'Error',
    //   'Image load failed. Unsupported media type or corrupted file.'
    // );
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.base64) {
      this.croppedImage = event.base64;
    }
  }

  imageLoaded() {
    this.showCropper = true;
  }
}

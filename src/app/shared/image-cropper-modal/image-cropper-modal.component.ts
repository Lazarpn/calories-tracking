import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  event: Event;
  croppedImage: string = '';
  showCropper = false;
  isCoverImage = false;

  constructor(
    private snackBar: MatSnackBar,
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
    this.onClose();
    this.dialogRef.close(this.croppedImage);
  }

  onCancel() {
    this.dialogRef.close(false);
  }

  loadImageFailed() {
    this.onCancel();
    this.snackBar.open('Error', 'Image load failed. Unsupported media type or corrupted file.');
  }

  onClose() {
    const event: ImageCroppedEvent = this.imageCropper.crop('base64');
    this.croppedImage = event.base64;
  }

  imageLoaded() {
    this.showCropper = true;
  }
}

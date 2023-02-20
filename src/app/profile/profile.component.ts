import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  imageSrc: SafeUrl = '';
  isPhotoUploaded: boolean;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}

  onSubmit(form) {
    console.log(form);
  }

  onUpload(event) {
    let uploadedImage = URL.createObjectURL(event.target.files[0]);
    let sanitizedUrl = this.sanitizer.bypassSecurityTrustUrl(uploadedImage);
    this.imageSrc = sanitizedUrl;
    this.isPhotoUploaded = true;
  }
}

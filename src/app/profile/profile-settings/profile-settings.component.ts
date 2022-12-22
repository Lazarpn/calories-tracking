import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss'],
})
export class ProfileSettingsComponent implements OnInit {
  @ViewChild('form', { static: true }) form: NgForm;
  preferenceApplied: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onPreferenceChange() {
    this.preferenceApplied = !this.form.value.preference;
  }
}

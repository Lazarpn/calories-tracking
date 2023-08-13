import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ForgotPasswordModel } from 'src/app/shared/models/user/forgot-password-model';
import { ExceptionDetail } from 'src/app/shared/models/exception-detail';
import { TranslationMessage } from 'src/app/shared/models/translation-message';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'ct-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
})
export class ForgotPasswordModalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });
  emailSentMessage: string;
  errorMessages: TranslationMessage[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {}

  onRedirect() {
    this.router.navigate(['/auth']);
  }

  onSubmit() {
    this.errorMessages = [];

    if (!this.form.valid) {
      this.errorMessages.push(this.utilityService.errorEmail());
      return;
    }
    const model: ForgotPasswordModel = {
      email: this.form.controls['email'].value,
    };

    this.authService.forgotPassword(model).subscribe({
      next: _ => {
        this.emailSentMessage = `label.forgot-password-email-sent`;
      },
      error: (errors: ExceptionDetail[]) => {
        this.errorMessages = this.utilityService.getErrorMessages(errors);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExceptionDetail } from 'src/app/shared/models/exception-detail';
import { TranslationMessage } from 'src/app/shared/models/translation-message';
import { UserConfirmEmailModel } from 'src/app/shared/models/user/user-confirm-email-model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'ct-verify-email-modal',
  templateUrl: './verify-email-modal.component.html',
  styleUrls: ['./verify-email-modal.component.scss'],
})
export class VerifyEmailModalComponent implements OnInit {
  changeEmailMode: boolean = false;
  errorMessages: TranslationMessage[] = [];
  userEmail: string;
  model: UserConfirmEmailModel = {
    emailVerificationCode: '',
  };

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userEmail = this.profileService.user.email;
  }

  onSubmitCode() {
    this.authService.verifyEmail(this.model).subscribe({
      next: _ => {
        this.profileService.user.emailConfirmed = true;
        this.router.navigate(['/meals']);
      },
      error: (exceptions: ExceptionDetail[]) => {
        this.errorMessages = this.utilityService.getErrorMessages(exceptions);
      },
    });
  }

  onSubmitEmail() {}

  onChangeEmail() {
    this.changeEmailMode = true;
  }

  onEmailChangeConfirm() {
    this.changeEmailMode = false;
    // this.authService
  }

  onEmailChangeCancel() {
    this.changeEmailMode = false;
  }

  onResendEmail() {}
}

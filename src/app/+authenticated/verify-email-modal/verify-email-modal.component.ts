import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExceptionDetail } from 'src/app/shared/models/exception-detail';
import { TranslationMessage } from 'src/app/shared/models/translation-message';
import { ChangeEmailModel } from 'src/app/shared/models/user/change-email-model';
import { ResentEmailResponseModel } from 'src/app/shared/models/user/resent-email-response-model';
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
  errorMessagesEmail: TranslationMessage[] = [];
  userEmail: string;
  timerDisplay: string;
  timerTimeLeft: number;
  codeModel: UserConfirmEmailModel = {
    emailVerificationCode: '',
  };
  emailModel: ChangeEmailModel = {
    newEmail: '',
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
    this.authService.verifyEmail(this.codeModel).subscribe({
      next: _ => {
        this.profileService.user.emailConfirmed = true;
        this.router.navigate(['/meals']);
      },
      error: (exceptions: ExceptionDetail[]) => {
        this.errorMessages = this.utilityService.getErrorMessages(exceptions);
      },
    });
  }

  onEmailChange() {
    this.changeEmailMode = true;
  }

  onEmailChangeConfirm() {
    this.authService.changeVerificationEmail(this.emailModel).subscribe({
      next: _ => {
        this.changeEmailMode = false;
        this.userEmail = this.emailModel.newEmail;
        this.profileService.user.email = this.userEmail;
      },
      error: (exceptions: ExceptionDetail[]) => {
        this.errorMessagesEmail = this.utilityService.getErrorMessages(exceptions);
      },
    });
  }

  onEmailChangeCancel() {
    this.changeEmailMode = false;
  }

  onResendEmail() {
    this.authService.resendVerificationEmail().subscribe({
      next: (model: ResentEmailResponseModel) => {
        this.startResendEmailTimer(model);
      },
      error: (exceptions: ExceptionDetail[]) => {
        const errors = this.utilityService.getErrorMessages(exceptions);
        this.errorMessages = this.errorMessages.concat(errors);
      },
    });
  }

  private startResendEmailTimer(model: ResentEmailResponseModel) {
    const timer = setInterval(() => {
      this.timerTimeLeft--;
      this.timerDisplay = this.calculateDisplayTime(model);
      if (this.timerTimeLeft === 0) {
        clearInterval(timer);
        this.timerDisplay = '';
      }
    }, 1000);
  }

  private calculateDisplayTime(model: ResentEmailResponseModel): string {
    // FIXME: treba pogledati da li ovako da se resi problem modela i treba videti kako da Timer run-uje i kada se browser ugasi ili da se getuje vreme, sta god
    this.timerTimeLeft = Math.floor(
      (new Date(model.newCodeExpiryDate).getTime() - new Date().getTime()) / 1000
    );
    const minutes = Math.floor(this.timerTimeLeft / 60);
    const seconds = this.timerTimeLeft % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}

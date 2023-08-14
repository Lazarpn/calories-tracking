import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordForm } from 'src/app/shared/models/form/reset-password-form';
import { ResetPasswordModel } from 'src/app/shared/models/user/reset-password-model';
import { AuthService } from '../../shared/services/auth.service';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { TranslationMessage } from 'src/app/shared/models/translation-message';
import { PASSWORD_PATTERN } from 'src/app/shared/constants';

@Component({
  selector: 'ct-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss'],
})
export class ResetPasswordModalComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  passwordSent: boolean = false;
  passwordSentMessage: string;
  passwordPattern: RegExp = PASSWORD_PATTERN;
  errorMessages: TranslationMessage[] = [];
  formModel: ResetPasswordForm = {
    password: '',
    password2: '',
  };
  model: ResetPasswordModel = {
    token: '',
    userId: '',
    password: '',
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private utilityService: UtilityService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.model.userId = params['userId'];
      this.model.token = params['token'];
    });
  }

  onSubmit() {
    this.errorMessages = [];
    if (!this.form.valid) {
      this.errorMessages = this.utilityService.checkPassword(
        this.formModel.password,
        this.formModel.password2
      );
      return;
    }

    this.model.password = this.formModel.password;

    this.authService.resetPassword(this.model).subscribe({
      next: _ => {
        this.passwordSent = true;
        this.passwordSentMessage = 'label.reset-password-succeeded';
      },
    });
  }

  onRedirect() {
    this.router.navigate(['/auth']);
  }
}

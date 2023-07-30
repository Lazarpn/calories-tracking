import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordForm } from 'src/app/shared/models/form/reset-password-form';
import { ResetPasswordModel } from 'src/app/shared/models/user/reset-password-model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'ct-reset-password-modal',
  templateUrl: './reset-password-modal.component.html',
  styleUrls: ['./reset-password-modal.component.scss'],
})
export class ResetPasswordModalComponent implements OnInit {
  @ViewChild('form') form: NgForm;
  passwordSent: boolean = false;
  passwordSentMessage: string;
  passwordPattern: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[^da-zA-Z]).{6,}$/;
  errorMessages: string[] = [];
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.model.userId = params['userId'];
      this.model.token = params['token'];
    });
  }

  onSubmit() {
    if (this.formModel.password !== this.formModel.password2) {
      this.passwordCheck(this.formModel.password, this.formModel.password2);
      return;
    }

    this.errorMessages = [];
    this.model.password = this.formModel.password;
    //FIXME: Internal server, bad request error itd..
    // this.model.token = 'blbla';
    // this.model.userId = 'blbala';

    this.authService.resetPassword(this.model).subscribe({
      next: _ => {
        this.passwordSent = true;
        this.passwordSentMessage = 'Your password has been successfully reset. You can now log in.';
      },
      error: error => {
        //FIXME:pitati za format greske
        this.passwordSent = true;
        console.log(error);
        this.passwordSentMessage = error;
      },
    });
  }

  onRedirect() {
    this.router.navigate(['/auth']);
  }

  private passwordCheck(password: string, password2: string) {
    const digitPattern = /\d/;
    const uppercasePattern = /[A-Z]/;
    const lowercasePattern = /[a-z]/;
    const specialCharacterPattern = /[^a-zA-Z0-9]/;

    if (this.formModel.password !== this.formModel.password2) {
      this.errorMessages.push('⚠️ The passwords do not match!');
      return;
    }

    if (password.length < 6) {
      this.errorMessages.push('⚠️ Password must be at least 6 characters.');
    }

    if (!digitPattern.test(password)) {
      this.errorMessages.push('⚠️ Password must contain at least 1 digit.');
    }

    if (!uppercasePattern.test(password)) {
      this.errorMessages.push('⚠️ Password must contain at least 1 uppercase letter.');
    }

    if (!lowercasePattern.test(password)) {
      this.errorMessages.push('⚠️ Password must contain at least 1 lowercase letter.');
    }

    if (!specialCharacterPattern.test(password)) {
      this.errorMessages.push('⚠️ Password must contain at least 1 special character.');
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../../services/auth.service';
import { GoogleLoginModel } from '../../models/user/google-login-model';
import { AuthResponseModel } from '../../models/user/auth-response.model';
import { ExceptionDetail } from '../../models/exception-detail';
import { Router } from '@angular/router';
import { UtilityService } from '../../services/utility.service';
import { TranslationMessage } from '../../models/translation-message';

@Component({
  selector: 'ct-google-sign-in',
  templateUrl: './google-sign-in.component.html',
  styleUrls: ['./google-sign-in.component.scss'],
})
export class GoogleSignInComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private utilityService: UtilityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: this.handleCredentialResponse.bind(this),
      auto_select: false,
      cancel_on_tap_outside: true,
    });
    // @ts-ignore
    google.accounts.id.renderButton(
      // @ts-ignore
      document.getElementById('google-button'),
      { theme: 'outline', size: 'large', width: '100%', access_type: 'offline', prompt: 'consent' }
    );
    // @ts-ignore
    google.accounts.id.prompt((notification: PromptMomentNotification) => {});
  }

  async handleCredentialResponse(response: any) {
    const googleModel = { idToken: response.credential } as GoogleLoginModel;
    this.authService.googleLogin(googleModel).subscribe({
      next: (model: AuthResponseModel) => {
        this.authService.handleAuthentication(model);
        this.router.navigate(['/meals']);
      },
      error: (exceptions: ExceptionDetail[]) => {
        this.handleErrors(exceptions);
      },
    });
  }

  private handleErrors(exceptions: ExceptionDetail[]) {
    const errors: TranslationMessage[] = this.utilityService.getErrorMessages(exceptions);
    console.log(errors);
    this.utilityService.displaySnackBarErrors(errors);
  }
}

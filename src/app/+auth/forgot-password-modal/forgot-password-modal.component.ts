import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ForgotPasswordModel } from 'src/app/shared/models/user/forgot-password-model';

@Component({
  selector: 'ct-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
})
export class ForgotPasswordModalComponent implements OnInit {
  email: string;
  errorMessage: string;
  emailSent: boolean = false;
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onRedirect() {
    this.router.navigate(['/auth']);
  }

  onSubmit() {
    const model: ForgotPasswordModel = {
      email: this.email,
    };
    this.authService.resetPassword(model).subscribe();
  }

  //request da li user sa tim email-om postoji
  //validacija
}

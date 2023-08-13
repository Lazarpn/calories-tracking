import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LS_USER_LANGUAGE } from './shared/constants';

@Component({
  selector: 'ct-root',
  templateUrl: './ct.component.html',
  styleUrls: ['./ct.component.scss'],
})
export class CtComponent implements OnInit {
  title: string = 'Calories Tracking';

  constructor(
    private authService: AuthService,
    private translateService: TranslateService
  ) {
    let languageToUse = environment.defaultLanguage;
    this.translateService.setDefaultLang(languageToUse);
    const savedLanguage = localStorage.getItem(LS_USER_LANGUAGE);

    if (savedLanguage) {
      languageToUse = savedLanguage;
    } else {
      localStorage.setItem(LS_USER_LANGUAGE, languageToUse);
    }
    this.translateService.use(languageToUse);
  }

  ngOnInit(): void {
    this.authService.autoSignIn();
  }
}

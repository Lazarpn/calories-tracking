import { Component } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { LS_USER_LANGUAGE } from 'src/app/shared/constants';

@Component({
  selector: 'ct-profile-language',
  templateUrl: './profile-language.component.html',
  styleUrls: ['./profile-language.component.scss'],
})
export class ProfileLanguageComponent {
  activeLanguage: { name: string; code: string; flag: string } | undefined;
  appLanguages = [
    { name: 'English', code: 'en', flag: '/assets/SVG/england.svg' },
    { name: 'Serbian', code: 'rs', flag: '/assets/SVG/serbia.svg' },
  ];

  constructor(private translateService: TranslateService) {
    this.activeLanguage = this.appLanguages.find(
      lang => lang.code === translateService.currentLang
    );
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.activeLanguage = this.appLanguages.find(lang => lang.code === event.lang);
      localStorage.setItem(LS_USER_LANGUAGE, event.lang);
    });
  }

  changeLanguage(language: { name: string; code: string; flag: string }) {
    this.translateService.use(language.code);
  }
}

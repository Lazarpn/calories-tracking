import { Injectable } from '@angular/core';
import {
  DIGIT_PATTERN,
  LENGTH_PATTERN,
  LOWERCASE_PATTERN,
  SPECIAL_CHARACTERS_PATTERN,
  UPPERCASE_PATTERN,
} from '../constants';
import { TranslationMessage } from '../models/translation-message';
import { ExceptionDetail } from '../models/exception-detail';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class UtilityService {
  constructor(
    private translateService: TranslateService,
    private snackBar: MatSnackBar
  ) {}

  displaySnackBarErrors(errors: TranslationMessage[]) {
    for (let error of errors) {
      this.getTranslatedMessage(error.name, error.param).subscribe((value: string) => {
        this.snackBar.open(value, '✖️');
      });
    }
  }

  getTranslatedMessage(name: string, params: any) {
    return this.translateService.get(name, params);
  }

  getErrorMessages(exceptions: ExceptionDetail[]): TranslationMessage[] {
    let errorMessages: TranslationMessage[] = [];
    for (let exception of exceptions) {
      errorMessages.push({
        name: `errors.${exception.errorCode}`,
        param: exception.params,
      });
    }
    return errorMessages;
  }

  errorEmail(): TranslationMessage {
    return {
      name: 'label.valid-email',
      param: null,
    };
  }

  checkPassword(password: string, password2: string = null): TranslationMessage[] {
    let errorMessages: TranslationMessage[] = [];
    if (password2) {
      if (password != password2) {
        errorMessages.push({ name: 'label.passwords-dont-match', param: null });
        return errorMessages;
      }
    }

    if (!LENGTH_PATTERN.test(password)) {
      errorMessages.push({ name: 'label.pasword-must-be-6-length', param: null });
    }

    if (!DIGIT_PATTERN.test(password)) {
      errorMessages.push({ name: 'label.password-must-contain-digit', param: null });
    }

    if (!UPPERCASE_PATTERN.test(password)) {
      errorMessages.push({ name: 'label.password-must-contain-uppercase-letter', param: null });
    }

    if (!LOWERCASE_PATTERN.test(password)) {
      errorMessages.push({ name: 'label.password-must-contain-lowercase-letter', param: null });
    }

    if (!SPECIAL_CHARACTERS_PATTERN.test(password)) {
      errorMessages.push({ name: 'label.password-must-contain-special-character', param: null });
    }

    return errorMessages;
  }

  createFormData(obj: any): FormData {
    const formData = new FormData();

    const appendFormData = (data: any, root: string | null = null) => {
      root = root || '';
      if (data instanceof File) {
        formData.append(root, data);
      } else if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
          appendFormData(data[i], root + '[' + i + ']');
        }
      } else if (data instanceof Date) {
        formData.append(root, data.toUTCString());
      } else if (typeof data === 'object' && data) {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            if (root === '') {
              appendFormData(data[key], key);
            } else {
              appendFormData(data[key], root + '.' + key);
            }
          }
        }
      } else {
        if (data !== null && typeof data !== 'undefined') {
          formData.append(root, data);
        }
      }
    };

    appendFormData(obj);

    return formData;
  }
}

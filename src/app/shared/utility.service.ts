import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

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

import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[ctNullToEmpty]',
})
export class NullToEmptyDirective {
  constructor(private control: NgControl) {}

  @HostListener('blur') onBlur() {
    const value = this.control.value;
    if (value === null || value === undefined || value === '') {
      this.control.control.setValue('?');
    }
  }
}

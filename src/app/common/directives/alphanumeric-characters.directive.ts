import { Directive, HostListener, ElementRef, Input } from '@angular/core';
@Directive({
  selector: '[alphaNumeric]'
})
export class AlphanumericDirective {
  regexStr = '^[a-zA-Z0-9 ]*$';
  @Input() isAlphaNumeric: boolean;

  constructor(private el: ElementRef) {}

  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }
}

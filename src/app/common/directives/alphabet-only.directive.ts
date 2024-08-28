import { Directive,HostListener, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[alphabetOnly]'
})
export class AlphabetOnlyDirective {
  regexStr = '^[a-zA-Z _\'\.-]*$';
  // @Input() isAlphabet: boolean;
  constructor(private el: ElementRef) {}
  @HostListener('keypress', ['$event']) onKeyPress(event) {
    return new RegExp(this.regexStr).test(event.key);
  }
}

import { Directive,ElementRef, HostListener } from '@angular/core';
import { NgControl, NgModel } from '@angular/forms';

@Directive({
  selector: '[appCountNumberFormat]'
})
export class CountNumberFormatDirective {
  constructor(private el: ElementRef, private ngModel: NgModel, private ngControl: NgControl) { }

  @HostListener('input', ['$event.target.value']) onInput(value: string): void {
    
    let inputValue: string = value.trim();
 
    // Scenario 6: If value exceeds 3 digits, automatically add dot after 3 digits
    if (inputValue.length > 3 && !inputValue.includes('.')) {
      inputValue = inputValue.slice(0, 3) + '.' + inputValue.slice(3);
    }

    // Validate digits after dot
    if (inputValue.includes('.')) {
      const parts = inputValue.split('.');
      if (parts[1].length > 2) {
        // Truncate to only include the first two digits after the dot
        inputValue = `${parts[0]}.${parts[1].substring(0, 2)}`;
      }
    }
 
    // Update the ngModel value
    this.ngControl.control.setValue(this.formatValue(inputValue), { emitEvent: false });
  }
 
  @HostListener('blur') onBlur(): void {
    let inputValue: string = this.el.nativeElement.value.trim();
 
    // Scenario 1: Ensure value is within 0.00 to 999.99 range
    let parsedValue = parseFloat(inputValue);
    if (parsedValue < 0 || parsedValue > 999.99 || isNaN(parsedValue)) {
      inputValue = '';
    }
 
    // Scenario 2: If value is '0', add '.00'
    if (inputValue === '0') {
      inputValue = '0.00';
    }
 
    // Scenario 3: If value contains only one digit after dot, add '0' at the end
    if (inputValue.includes('.') && inputValue.split('.')[1].length === 1) {
      inputValue += '0';
    }
 
    // Scenario 4: If value ends with a dot, add '00' after dot
    if (inputValue.endsWith('.')) {
      inputValue += '00';
    }

    // Scenario 5: If value star with a dot, add '00' before dot
    if (inputValue.startsWith('.')) {
      inputValue = '00' + inputValue;
    }
    // Update the ngModel value
    this.ngControl.control.setValue(this.formatValue(inputValue), { emitEvent: false });
  }
 
  private formatValue(value: string): string {
    return value;
  }

}
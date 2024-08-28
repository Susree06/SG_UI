import { Directive, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, DefaultValueAccessor } from '@angular/forms';

const NUMBERS_ONLY_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  // tslint:disable-next-line: no-use-before-declare
  useExisting: forwardRef(() => NumbersOnlyDirective),
  multi: true
};
@Directive({
  selector: 'input[numbersOnly]',
  providers: [NUMBERS_ONLY_VALUE_ACCESSOR]
})
export class NumbersOnlyDirective extends DefaultValueAccessor {
  override writeValue(value: any): void {
    if (typeof value === 'string') {
      value = value.replace(/[^0-9]*/g, '');
    }
    super.writeValue(value);
  }

  @HostListener('input', ['$event.target.value'])
  ngOnChange = (val: string) => {
    const newVal = val.replace(/[^0-9]*/g, '');
    this.onChange(newVal);
    super.writeValue(newVal);
  };
}

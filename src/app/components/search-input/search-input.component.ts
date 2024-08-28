import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent {
  @Input() searchCtrl = new FormControl('');

  onKeydown(e: KeyboardEvent, i: HTMLInputElement) {
    i.onkeydown?.(e);
    e.stopPropagation();
  }
}

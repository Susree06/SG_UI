import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-tool-tip',
  templateUrl: './tool-tip.component.html',
  styleUrls: ['./tool-tip.component.scss']
})
export class ToolTipComponent {
  isTooltipVisible = false;
  isLeftAligned = false;
  timeoutId: any;
  hideTimeoutId: any;

  constructor(private el: ElementRef) {}

  showTooltip() {
    this.clearHideTimeout();
    this.isTooltipVisible = true;
    this.adjustTooltipPosition();
    this.timeoutId = setTimeout(() => {
      this.hideTooltipWithDelay();
    }, 3000); 
  }

  hideTooltip() {
    this.isTooltipVisible = false;
    this.clearHideTimeout();
  }
  hideTooltipWithDelay() {
    const hideDelay = 300;
    this.hideTimeoutId = setTimeout(() => {
      this.isTooltipVisible = false;
    }, hideDelay);
  }

  adjustTooltipPosition() {
    const tooltip = this.el.nativeElement.querySelector('.tooltip-content');
    const rect = tooltip.getBoundingClientRect();
    const rightOverflow = rect.right > window.innerWidth;
    const leftOverflow = rect.left < 0;

    if (rightOverflow) {
      this.isLeftAligned = true;
    } else if (leftOverflow) {
      this.isLeftAligned = false;
    }
  }
  clearHideTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    if (this.hideTimeoutId) {
      clearTimeout(this.hideTimeoutId);
      this.hideTimeoutId = null;
    }
  }
}

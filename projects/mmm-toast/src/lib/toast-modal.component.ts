import {AfterViewInit, Component, Input, Output, EventEmitter} from '@angular/core';

import {ToastDataModel} from './models/toast-data.model';

/**
 * A Toast component shows message with title and close button.
 */
@Component({
  selector: 'mmm-toast-modal',
  templateUrl: './toast-modal.component.html'
})
export class ToastModalComponent implements AfterViewInit {
  @Input() toast: ToastDataModel;
  @Output() closeToastEvent = new EventEmitter();
  progressInterval: number;
  progressPercent = 0;
  startTime: number = performance.now();

  ngAfterViewInit() {
    this.handleProgress();
  }

  handleProgress() {
    if (this.toast.showDuration && this.toast.timeout > 0) {
      this.progressInterval = window.setInterval(() => {
        this.progressPercent = (100 - ((performance.now() - this.startTime) / this.toast.timeout * 100)); // Descending progress

        if (this.progressPercent <= 0) {
          clearInterval(this.progressInterval);
        }
      }, 16.7); // 60 fps
    }
  }

  close($event: any) {
    $event.preventDefault();
    this.closeToastEvent.next(this.toast);

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}

import { AfterViewInit, Component, Input, Output, EventEmitter } from '@angular/core';

import { ToastData } from './toasta.service';

/**
 * A Toast component shows message with title and close button.
 */
@Component({
  selector: 'ngx-toast',
  templateUrl: './toast.component.html'
})
export class ToastComponent implements AfterViewInit {
  @Input() toast: ToastData;
  @Output('closeToast') closeToastEvent = new EventEmitter();
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

  /**
   * Event handler invokes when user clicks on close button.
   * This method emit new event into ToastaContainer to close it.
   */
  close($event: any) {
    $event.preventDefault();
    this.closeToastEvent.next(this.toast);

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}

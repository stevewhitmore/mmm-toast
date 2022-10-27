import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { ToastModel } from './models';

@Component({
  selector: 'mmm-toast-modal',
  template: `
    <div class="toast" [ngClass]="[toast.type, toast.theme]">
      <button *ngIf="toast.showClose" class="close-button" (click)="close(toast)"></button>
      <div *ngIf="toast.title || toast.message" class="toast-text">
          <span *ngIf="toast.title" class="toast-title">{{toast.title}}</span>
          <br *ngIf="toast.title && toast.message" />
          <span *ngIf="toast.message" class="toast-message">{{toast.message}}</span>
      </div>
      <div class="durationbackground" *ngIf="toast.showDuration && timeout > 0">
          <div class="durationbar" [style.width.%]="progressPercent">
          </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class MmmToastModalComponent implements AfterViewInit {
  @Input() toast: ToastModel;
  @Output() closeToastEvent: EventEmitter<number> = new EventEmitter();
  progressInterval: number;
  progressPercent = 0;
  startTime: number = performance.now();
  timeout: number;

  constructor(private ref: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.handleProgress();
  }

  handleProgress() {
    this.timeout = this.toast.timeout || 5000;

    if (this.toast.showDuration && this.timeout > 0) {
      this.progressInterval = window.setInterval(() => {
        this.progressPercent = (100 - ((performance.now() - this.startTime) / this.timeout * 100));
        if (this.toast.isCountdown) {
          const timeRemaining = (this.timeout - (performance.now() - this.startTime) );
          const secondsRemaining = Math.ceil(timeRemaining / 1000);
          this.toast.title = `Seconds remaining: ${secondsRemaining.toString()}`;
          this.toast.type = 'toasta-type-wait';
          this.toast.message = '';
        }
        this.ref.detectChanges();

        if (this.progressPercent <= 0) {
          clearInterval(this.progressInterval);
          this.close(this.toast);
        }
      });
    }
  }

  close(toast: ToastModel) {
    if (toast.id) {
      this.closeToastEvent.next(toast.id);
    }

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }
}

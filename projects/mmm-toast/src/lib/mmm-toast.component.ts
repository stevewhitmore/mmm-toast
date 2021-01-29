import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MmmToastService, ToastModel } from './mmm-toast.service';

@Component({
  selector: 'mmm-toast',
  template: `
    <div class="toast-wrapper" *ngIf="(toasts$ | async) as toasts" [ngClass]="[position$ | async]">
      <mmm-toast-modal *ngFor="let toast of toasts" [toast]="toast" (closeToastEvent)="clearToast($event)"></mmm-toast-modal>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MmmToastComponent implements OnInit {
  positionSelector: string;

  toasts$: Observable<ToastModel[]>;
  position$: Observable<string>;

  constructor(private mmmToastService: MmmToastService) {}

  ngOnInit() {
    this.listenForToastEvent();
  }

  listenForToastEvent() {
    this.toasts$ = this.mmmToastService.toastPop$;
    this.position$ = this.mmmToastService.position$;
  }

  clearToast(toastId: any) {
    this.mmmToastService.removeToast(toastId);
  }

}

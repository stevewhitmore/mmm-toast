import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { ToastService, ToastOptionsModel, ToastDataModel, ToastEvent, ToastEventType } from '../../../projects/mmm-toast/src/public_api';

import { ToastPositionService } from '../toast-position.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private toastService: ToastService, private toastPositionService: ToastPositionService) {
  }

  themes = [{
    name: 'Default Theme',
    code: 'default'
  }, {
    name: 'Material Design',
    code: 'material'
  }, {
    name: 'Bootstrap',
    code: 'bootstrap'
  }];


  types = [{
    name: 'Default',
    code: 'default',
  }, {
    name: 'Info',
    code: 'info'
  }, {
    name: 'Success',
    code: 'success'
  }, {
    name: 'Wait',
    code: 'wait'
  }, {
    name: 'Error',
    code: 'error'
  }, {
    name: 'Warning',
    code: 'warning'
  }];


  positions = [{
    name: 'Top Left',
    code: 'top-left',
  }, {
    name: 'Top Center',
    code: 'top-center',
  }, {
    name: 'Top Right',
    code: 'top-right',
  }, {
    name: 'Top Full Width',
    code: 'top-fullwidth',
  }, {
    name: 'Bottom Left',
    code: 'bottom-left',
  }, {
    name: 'Bottom Center',
    code: 'bottom-center',
  }, {
    name: 'Bottom Right',
    code: 'bottom-right',
  }, {
    name: 'Bottom Full Width',
    code: 'bottom-fullwidth',
  }, {
    name: 'Center Center',
    code: 'center-center',
  }];

  options = {
    title: 'Toast It!',
    msg: 'Mmmm, tasties...',
    showClose: true,
    showDuration: false,
    timeout: 5000,
    theme: this.themes[0].code,
    type: this.types[0].code
  };

  position: string = this.positions[6].code;
  private insertedToasts: number[] = [];
  private subscription: Subscription;

  ngOnInit() {
    this.listenForToastEvent();
  }

  listenForToastEvent() {
    this.toastService.event$.subscribe((event: ToastEvent) => {
      if (event.type === ToastEventType.ADD) {
        const toast: ToastDataModel = event.value;
        this.insertedToasts.push(toast.id);
      } else if (event.type === ToastEventType.CLEAR_ALL) {
        this.insertedToasts = [];
      }
    });
  }

  getTitle(num: number): string {
    return 'Countdown: ' + num;
  }

  getMessage(num: number): string {
    return 'Seconds left: ' + num;
  }

  newToast() {
    const toastOptionsModel: ToastOptionsModel = {
      title: this.options.title,
      msg: this.options.msg,
      showClose: this.options.showClose,
      showDuration: this.options.showDuration,
      timeout: this.options.timeout,
      theme: this.options.theme,
      onAdd: (toast: ToastDataModel) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove(toast: ToastDataModel) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };

    switch (this.options.type) {
      case 'default': this.toastService.default(toastOptionsModel); break;
      case 'info': this.toastService.info(toastOptionsModel); break;
      case 'success': this.toastService.success(toastOptionsModel); break;
      case 'wait': this.toastService.wait(toastOptionsModel); break;
      case 'error': this.toastService.error(toastOptionsModel); break;
      case 'warning': this.toastService.warning(toastOptionsModel); break;
    }
  }

  newCountdownToast() {
    const modalInterval = 1000;
    const seconds = this.options.timeout / 1000;
    let subscription: Subscription;

    const toastOptionsModel: ToastOptionsModel = {
      title: this.getTitle(seconds || 0),
      msg: this.getMessage(seconds || 0),
      showClose: this.options.showClose,
      showDuration: this.options.showDuration,
      timeout: this.options.timeout,
      theme: this.options.theme,
      onAdd: (toast: ToastDataModel) => {
        console.log('Toast ' + toast.id + ' has been added!');
        // Run the timer with 1 second iterval
        const observable = interval(modalInterval).pipe(take(seconds));
        // Start listen seconds bit
        subscription = observable.subscribe((count: number) => {
          // Update title
          toast.title = this.getTitle(seconds - count - 1 || 0);
          // Update message
          toast.msg = this.getMessage(seconds - count - 1 || 0);
        });

      },
      onRemove(toast: ToastDataModel) {
        console.log('Toast ' + toast.id + ' has been removed!');
        // Stop listenning
        subscription.unsubscribe();
      }
    };

    switch (this.options.type) {
      case 'default': this.toastService.default(toastOptionsModel); break;
      case 'info': this.toastService.info(toastOptionsModel); break;
      case 'success': this.toastService.success(toastOptionsModel); break;
      case 'wait': this.toastService.wait(toastOptionsModel); break;
      case 'error': this.toastService.error(toastOptionsModel); break;
      case 'warning': this.toastService.warning(toastOptionsModel); break;
    }
  }

  clearToasties() {
    this.toastService.clearAll();
  }

  clearLastToast() {
    this.toastService.clear(this.insertedToasts.pop());
  }

  changePosition($event) {
    this.position = $event;
    this.toastPositionService.setPosition(this.position);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

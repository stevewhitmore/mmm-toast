import {Component, Input, OnInit} from '@angular/core';

import {isFunction} from './toast.utils';
import {ToastService} from './services/toast.service';

import {ToastEvent} from './state/toast.event';
import {ToastEventType} from './state/toast-event-type.enum';

import {ToastConfigService} from './services/toast-config.service';
import {ToastDataModel} from './models/toast-data.model';

/**
 * Toasta is container for Toast components
 */
@Component({
  selector: 'mmm-toast',
  template: `
    <div id="toasta" [ngClass]="[position]">
        <mmm-toast-modal *ngFor="let toast of toasts" [toast]="toast" (closeToastEvent)="closeToast(toast)"></mmm-toast-modal>
    </div>`
})
export class ToastComponent implements OnInit {
  /**
   * Set of constants defines position of Toasta on the page.
   */
  static POSITIONS: string[] = ['bottom-right', 'bottom-left', 'bottom-center', 'bottom-fullwidth', 'top-right', 'top-left', 'top-center', 'top-fullwidth', 'center-center'];

  private _position = '';
  // The window position where the toast pops up. Possible values:
  // - bottom-right (default value from ToastConfig)
  // - bottom-left
  // - bottom-center
  // - bottom-fullwidth
  // - top-right
  // - top-left
  // - top-center
  // - top-fullwidth
  // - center-center
  @Input()
  set position(value: string) {
    if (value) {
      let notFound = true;
      for (const position of ToastComponent.POSITIONS) {
        if (position === value) {
          notFound = false;
          break;
        }
      }
      if (notFound) {
        // Position was wrong - clear it here to use the one from config.
        value = this.config.position;
      }
    } else {
      value = this.config.position;
    }
    this._position = 'toasta-position-' + value;
  }

  get position(): string {
    return this._position;
  }

  // The storage for toasts.
  toasts: Array<ToastDataModel> = [];

  constructor(private config: ToastConfigService,
              private toastService: ToastService) {
    // Initialise position
    this.position = '';
  }

  /**
   * `ngOnInit` is called right after the directive's data-bound properties have been checked for the
   * first time, and before any of its children have been checked. It is invoked only once when the
   * directive is instantiated.
   */
  ngOnInit(): any {
    this.listenForToastEvent();
  }

  listenForToastEvent() {
    this.toastService.event$.subscribe((event: ToastEvent) => {
      if (event.type === ToastEventType.ADD) {
        const toast: ToastDataModel = event.value;
        this.add(toast);
      } else if (event.type === ToastEventType.CLEAR) {
        const id: number = event.value;
        this.clear(id);
      } else if (event.type === ToastEventType.CLEAR_ALL) {
        this.clearAll();
      }
    });
  }

  /**
   * Event listener of 'closeToast' event comes from ToastComponent.
   * This method removes ToastModalComponent assosiated with this Toast.
   */
  closeToast(toast: ToastDataModel) {
    this.clear(toast.id);
  }

  /**
   * Add new Toast
   */
  add(toast: ToastDataModel) {
    // If we've gone over our limit, remove the earliest
    // one from the array
    if (this.config.limit && this.toasts.length >= this.config.limit) {
      this.toasts.shift();
    }
    // Add toasta to array
    this.toasts.push(toast);
    //
    // If there's a timeout individually or globally,
    // set the toast to timeout
    if (+toast.timeout) {
      this.closeAfterTimeout(toast);
    }
  }

  /**
   * Clear individual toast by id
   * @param id is unique identifier of Toast
   */
  clear(id: number) {
    if (id) {
      this.toasts.forEach((value: any, key: number) => {
        if (value.id === id) {
          if (value.onRemove && isFunction(value.onRemove)) {
            value.onRemove.call(this, value);
          }
          this.toasts.splice(key, 1);
        }
      });
    } else {
      throw new Error('Please provide id of Toast to close');
    }
  }

  /**
   * Clear all toasts
   */
  clearAll() {
    this.toasts.forEach((value: any, key: number) => {
      if (value.onRemove && isFunction(value.onRemove)) {
        value.onRemove.call(this, value);
      }
    });
    this.toasts = [];
  }

  /**
   * Custom setTimeout function for specific setTimeouts on individual toasts.
   */
  closeAfterTimeout(toast: ToastDataModel) {
    window.setTimeout(() => {
      this.clear(toast.id);
    }, toast.timeout);
  }
}

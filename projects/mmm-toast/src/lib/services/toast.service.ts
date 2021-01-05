import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

import {isString, isNumber, isFunction} from '../toast.utils';

import {ToastOptionsModel} from '../models/toast-options.model';
import {ToastConfigService} from './toast-config.service';
import {ToastDataModel} from '../models/toast-data.model';

import {ToastEvent} from '../state/toast.event';
import {ToastEventType} from '../state/toast-event-type.enum';

/**
 * Helps create different kinds of Toasts
 */
@Injectable({
  providedIn: 'root'
})
export class ToastService {
  static THEMES: Array<string> = ['default', 'material', 'bootstrap'];
  uniqueCounter = 0;

  private eventSource: Subject<ToastEvent> = new Subject<ToastEvent>();
  public event$: Observable<ToastEvent> = this.eventSource.asObservable();

  constructor(private config: ToastConfigService) {
  }

  default(options: ToastOptionsModel | string | number): void {
    this.add(options, 'default');
  }

  info(options: ToastOptionsModel | string | number): void {
    this.add(options, 'info');
  }

  success(options: ToastOptionsModel | string | number): void {
    this.add(options, 'success');
  }

  wait(options: ToastOptionsModel | string | number): void {
    this.add(options, 'wait');
  }

  error(options: ToastOptionsModel | string | number): void {
    this.add(options, 'error');
  }

  warning(options: ToastOptionsModel | string | number): void {
    this.add(options, 'warning');
  }

  add(options: ToastOptionsModel | string | number, type: string) {
    let toastOptions: ToastOptionsModel;

    if (isString(options) && options !== '' || isNumber(options)) {
      toastOptions = {
        title: options.toString()
      } as ToastOptionsModel;
    } else {
      toastOptions = options as ToastOptionsModel;
    }

    if (!toastOptions || !toastOptions.title && !toastOptions.msg) {
      throw new Error('mmm-toast: No toast title or message specified!');
    }

    type = type || 'default';

    // Set a unique counter for an id
    this.uniqueCounter++;

    // Set the local vs global config items
    const showClose = this.checkConfigItem(this.config, toastOptions, 'showClose');

    // Set the local vs global config items
    const showDuration = this.checkConfigItem(this.config, toastOptions, 'showDuration');

    // If we have a theme set, make sure it's a valid one
    let theme: string;
    if (toastOptions.theme) {
      theme = ToastService.THEMES.indexOf(toastOptions.theme) > -1 ? toastOptions.theme : this.config.theme;
    } else {
      theme = this.config.theme;
    }

    const toast: ToastDataModel = {
      id: this.uniqueCounter,
      title: toastOptions.title,
      msg: toastOptions.msg,
      showClose,
      showDuration,
      type: 'toasta-type-' + type,
      theme: 'toasta-theme-' + theme,
      onAdd: toastOptions.onAdd && isFunction(toastOptions.onAdd) ? toastOptions.onAdd : null,
      onRemove: toastOptions.onRemove && isFunction(toastOptions.onRemove) ? toastOptions.onRemove : null
    } as ToastDataModel;

    // If there's a timeout individually or globally, set the toast to timeout
    // Allows a caller to pass null/0 and override the default. Can also set the default to null/0 to turn off.
    toast.timeout = toastOptions.hasOwnProperty('timeout') ? toastOptions.timeout : this.config.timeout;

    // Push up a new toast item
    // this.toastsSubscriber.next(toast);
    // this.toastsEmitter.next(toast);
    this.emitEvent(new ToastEvent(ToastEventType.ADD, toast));
    // If we have a onAdd function, call it here
    if (toastOptions.onAdd && isFunction(toastOptions.onAdd)) {
      toastOptions.onAdd.call(this, toast);
    }
  }

  clearAll() {
    this.emitEvent(new ToastEvent(ToastEventType.CLEAR_ALL));
  }

  clear(id: number) {
    this.emitEvent(new ToastEvent(ToastEventType.CLEAR, id));
  }

  // Checks whether the local option is set, if not,
  // checks the global config
  checkConfigItem(config: any, options: any, property: string) {
    if (options[property] === false) {
      return false;
    } else if (!options[property]) {
      return config[property];
    } else {
      return true;
    }
  }

  emitEvent(event: ToastEvent) {
    this.eventSource.next(event);
  }
}
